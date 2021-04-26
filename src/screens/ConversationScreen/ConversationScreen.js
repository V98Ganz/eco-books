import { Button, View, Text } from "react-native";
import React from "react";
import { firebase } from "../../firebase/config";

export default class ConversationScreen extends React.Component {
  state = {
    convo: {},
    isLoading: true,
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
    console.log(this.state.convo);
    return (
      <View>
        <Button
          title="Go Dem Messages!"
          onPress={() => this.getMessagesFromChatroom()}
        />
      </View>
    );
  }
}
