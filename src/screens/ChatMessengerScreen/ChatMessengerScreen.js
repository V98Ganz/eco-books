import React from "react";
import { Button, View, Text } from "react-native";
import { firebase } from "../../firebase/config";

class ChatMessengerScreen extends React.Component {
  state = {};

  async checkDataBaseForChatRoom(senderId, receiverId) {
    const snapshot = await firebase.firestore().collection("chatRooms").get();
    const collection = {};
    snapshot.forEach((doc) => {
      collection[doc.id] = doc.data();
    });

    for (let chat in collection) {
      const values = Object.values(collection);
      for (let obj of values) {
        const matchedIds = obj.users.every(
          (value) => value === senderId || value === receiverId
        );

        return matchedIds;
      }
    }
  }

  startChat = (id) => {
    firebase
      .firestore()
      .collection("chatRooms")
      .add({
        users: [id, "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1"],
      });
  };

  render() {
    const currentUser = this.props.user.id;
    return (
      <View>
        <Text>Press to send message!</Text>
        <Button
          title="Message"
          onPress={() =>
            this.checkDataBaseForChatRoom(
              currentUser,
              "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1"
            )
          }
        />
      </View>
    );
  }
}

export default ChatMessengerScreen;
