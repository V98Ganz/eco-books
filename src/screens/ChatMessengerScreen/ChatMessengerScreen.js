import React from "react";
import { Button, View, Text } from "react-native";
import { firebase } from "../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { default as ConversationScreen } from "../ConversationScreen/ConversationScreen";

const Stack = createStackNavigator();

export default class ChatMessengerScreen extends React.Component {
  state = {
    renderOneConversation: false,
  };

  checkDataBaseForChatRoom = async (senderId, receiverId) => {
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
    isMatched === true ? this.goToChat() : this.startChat(senderId);
  };

  goToChat = () => {
    this.setState({
      renderOneConversation: true,
    });
  };

  goBack = () => {
    this.setState({
      renderOneConversation: false,
    });
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
    console.log(this.state)
    if (this.state.renderOneConversation === false) {
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
     else if (this.state.renderOneConversation === true) {
      return (
        <View>
          <Text>Go back</Text>
          <Button
            title="Message"
            onPress={() =>
              this.goBack()
            }
          />
        <ConversationScreen />
        </View>
      )
    }
  }
}

// export default ChatMessengerScreen;
