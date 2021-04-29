import React from "react";
import { Text, Touchable, TouchableOpacity, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

function MessageSeller(props) {
  queryCheck = async (senderInfo, receiverId, receiverName) => {
    const result = await checkDataBaseForChatRoom(senderInfo.id, receiverId);
    const isThereARoom = await result.find((item) => item === true);
    if (isThereARoom) {
      props.navigation.navigate("Messages");
    } else {
      startChat(senderInfo, receiverId, receiverName);
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
        props.navigation.navigate("Messages");
      });
  };

  return (
    <TouchableOpacity
      style={styles.bookcard_button}
      onPress={() =>
        queryCheck(props.user, props.bookOwnerId, props.bookOwnerName)
      }
    >
      <Text style={styles.button_text}>Contact Seller</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookcard_button: {
    backgroundColor: "#389f70",
    width: 150,
    borderRadius: 50,
    marginBottom: 5,
    marginTop: 10,
    padding: 5,

    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },

  button_text: {
    fontSize: 17,
    color: "#ffffff",
    marginLeft: 10,
  },
});

export default MessageSeller;
