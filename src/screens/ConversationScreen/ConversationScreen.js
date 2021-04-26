import { Button, View, Text } from "react-native";
import React from "react";
import { firebase } from "../../firebase/config";
import SingleMessage from "../ChatMessengerScreen/SingleMessage";
import { GiftedChat } from "react-native-gifted-chat";

export default class ConversationScreen extends React.Component {
  state = {
    convo: [],
  };

  getMessagesFromChatroom = async (chatRoomId) => {
    const snapshot = await firebase
      .firestore()
      .collection("chatRooms")
      .doc("XzEvusxwsofJzrxz4Emi")
      .collection("Messages")
      .get();

    const conversation = {};
    snapshot.forEach((doc) => {
      conversation[doc.id] = doc.data();
    });

    const chats = Object.values(conversation);
    return chats;
  };

  componentDidMount() {
    this.getMessagesFromChatroom().then((messages) => {
      this.setState({ convo: messages });
    });
  }

  render() {
    const { convo } = this.state;
    return (
      <View>
        {convo.map((convObj) => {
          return (
            <SingleMessage
              sentBy={convObj.sentBy}
              value={convObj.text}
              key={convObj.id}
            />
          );
        })}
      </View>
    );
  }
}
