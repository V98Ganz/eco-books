import React from "react";
import { Button, View, Text } from "react-native";
import { firebase } from "../../firebase/config";

export default function ChatMessengerScreen(props, { navigation }) {
  state = {};

  const checkDataBaseForChatRoom = async (senderId, receiverId) => {
    const snapshot = await firebase.firestore().collection("chatRooms").get();
    const collection = {};
    snapshot.forEach((doc) => {
      collection[doc.id] = doc.data();
    });

    const values = Object.values(collection);
    let isMatched = "";

    for (let obj of values) {
      const matchedIds = obj.users.every(
        (value) => value === senderId || value === receiverId
      );

      isMatched = matchedIds;
    }
    isMatched === true ? goToChat() : startChat(senderId);
  };

  const goToChat = () => {
    navigation.navigate;
  };

  const startChat = (id) => {
    firebase
      .firestore()
      .collection("chatRooms")
      .add({
        users: [id, "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1"],
      });
  };

  const currentUser = props.user.id;
  return (
    <View>
      <Text>Press to send message!</Text>
      <Button
        title="Message"
        onPress={() =>
          checkDataBaseForChatRoom(currentUser, "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1")
        }
      />
    </View>
  );
}

// export default ChatMessengerScreen;
