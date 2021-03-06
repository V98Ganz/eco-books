import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

export default class BuyBooks extends Component {
  state = {
    userObject: {},
    bookOwnerObject: {},
  };

  queryCheck = async (senderInfo, receiverId, receiverName) => {

    const result = await this.checkDataBaseForChatRoom(
      senderInfo.id,
      receiverId
    );
    const isThereARoom = await result.find((item) => item === true);
    if (isThereARoom) {
      this.props.navigation.navigate("Messages");
    } else {
      this.startChat(senderInfo, receiverId, receiverName);
    }
  };

  checkDataBaseForChatRoom = async (senderId, receiverId) => {
    const snapshot = await firebase.firestore().collection("chatRooms").get();
    const collection = {};
    snapshot.forEach((doc) => {
      collection[doc.id] = doc.data();
    });

    const values = Object.values(collection);
    let isMatched = [];

    for (let obj of values) {
      const matchedIds = obj.users.every(
        (value) => value === senderId || value === receiverId
      );
      isMatched.push(matchedIds);
    }
    return isMatched;
  };

  startChat = (senderInfo, receiverId, receiverName) => {
    firebase
      .firestore()
      .collection("chatRooms")
      .add({
        users: [senderInfo.id, receiverId],
      })
      .then((doc) => {
        firebase
          .firestore()
          .collection("users")
          .doc(senderInfo.id)
          .collection("active-conversations")
          .doc(doc.id)
          .set({
            to: receiverName,
            roomId: doc.id,
          });
        firebase
          .firestore()
          .collection("users")
          .doc(receiverId)
          .collection("active-conversations")
          .doc(doc.id)
          .set({
            to: senderInfo.fullName,
            roomId: doc.id,
          });
        this.props.navigation.navigate("Messages");
      });
  };

  buyNow = () => {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(this.props.user.id)
      .get()
      .then((doc) => {
        this.setState({ userObject: doc.data() });
      })
      .then(() => {
        if (this.state.userObject.coins < this.props.bookCost) {
          alert(
            "You do not have enough bookCoins to buy this book, get walking!"
          );
        } else {
          const buyerUserObject = this.state.userObject;

          buyerUserObject.coins =
            Number(buyerUserObject.coins) - Number(this.props.bookCost);

          usersRef
            .doc(this.props.user.id)
            .set(buyerUserObject)
            .then(() => {
              usersRef
                .doc(this.props.bookOwnerId)
                .get()
                .then((doc) => {
                  const bookOwnerObject = doc.data();

                  bookOwnerObject.coins =
                    Number(bookOwnerObject.coins) + Number(this.props.bookCost);

                  this.setState({ bookOwnerObject: bookOwnerObject });
                })
                .then(() => {
                  usersRef
                    .doc(this.props.bookOwnerId)
                    .set(this.state.bookOwnerObject);
                })
                .then(() => {
                  usersRef
                    .doc(this.props.bookOwnerId)
                    .collection("books")
                    .doc(this.props.bookId)
                    .delete()
                    .then(() => {
                      alert(
                        `Congratulations you have just bought ${this.props.bookTitle}`
                      );
                      this.props.alertBookCard(this.props.bookId);
                      
                    });
                });
            });
        }
      })
      .then(() => {
        this.queryCheck(
          this.props.user,
          this.props.bookOwnerId,
          this.props.bookOwnerName
        );
      })
  };

  render() {
    return (
      <TouchableOpacity style={styles.bookcard_button} onPress={this.buyNow}>
        <Text style={styles.button_text}>Buy Now</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bookcard_button: {
    backgroundColor: "#389f70",
    width: 105,
    borderRadius: 50,
    padding: 5,
  },

  button_text: {
    fontSize: 17,
    color: "#ffffff",
    marginLeft: 10,
  },
});
