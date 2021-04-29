import React from "react";
import { Text } from "react-native";
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
            roomId: doc.id
          });
        firebase
          .firestore()
          .collection("users")
          .doc(receiverId)
          .collection("active-conversations")
          .doc(doc.id)
          .set({
            to: senderInfo.fullName,
            roomId: doc.id
          });
        props.navigation.navigate("Messages");
      });
  };

  return (
    <Text
      onPress={() =>
        queryCheck(props.user, props.bookOwnerId, props.bookOwnerName)
      }
    >
      Contact Seller
    </Text>
  );
}

export default MessageSeller;
