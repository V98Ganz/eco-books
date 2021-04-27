import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { firebase } from "../../firebase/config";

export default class BuyBooks extends Component {
  state = {
    userObject: {},
    bookOwnerObject: {},
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
          buyerUserObject.coins = buyerUserObject.coins - this.props.bookCost;
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
                    bookOwnerObject.coins + this.props.bookCost;
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
                      //redirect to chat with bookower and user
                    });
                });
            });
        }
      });
  };

  render() {
    return <Text onPress={this.buyNow}>Buy Now</Text>;
  }
}
