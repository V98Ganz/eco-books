import {
  Button,
  View,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { firebase } from "../../firebase/config";
import SingleMessage from "../ChatMessengerScreen/SingleMessage";
import styles from "../ChatMessengerScreen/styles";

export default class ConversationScreen extends React.Component {
  state = {
    convo: [],
    senderMessage: "",
  };

  getMessagesFromChatroom = async (cb) => {
    const snapshot = await firebase
      .firestore()
      .collection("chatRooms")
      .doc(this.props.roomId)
      .collection("Messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversation = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          return firebaseData;
        });
        cb(conversation);
      });
    return snapshot;
  };

  componentDidMount() {
    this.getMessagesFromChatroom((messages) => {
      this.setState({ convo: messages });
    });
  }

  sendMessage = () => {
    const sender = this.props.senderName;
    const message = this.state.senderMessage;
    const roomId = this.props.roomId;
    if (message) {
      firebase
        .firestore()
        .collection("chatRooms")
        .doc(roomId)
        .collection("Messages")
        .add({
          sentBy: sender,
          text: message,
          createdAt: new Date().getTime(),
        })
        .then((doc) => {
          firebase
            .firestore()
            .collection("chatRooms")
            .doc(roomId)
            .collection("Messages")
            .doc(doc.id)
            .update({
              id: doc.id,
            });
        });
      this.clearSentMessage();
    } else {
      Alert.alert("Can not send empty messages!");
    }
  };

  clearSentMessage = () => {
    return this.setState({ senderMessage: "" });
  };

  onChange = (text) => {
    return this.setState({ senderMessage: text });
  };

  render() {
    const { convo, senderMessage } = this.state;
    return (
      <ScrollView>
        <View style={{ paddingBottom: 50 }}>
          {convo.map((convObj) => {
            return (
              <View key={convObj.id || "no id found here"}>
                <SingleMessage sentBy={convObj.sentBy} value={convObj.text} />
              </View>
            );
          })}
          <View style={styles.send_message}>
            <TextInput
              style={styles.text_input}
              placeholder="Type your message..."
              placeholderTextColor="#3f3f3f"
              onChangeText={this.onChange}
              clearButtonMode="always"
              value={senderMessage}
            ></TextInput>
            <Button title="Send" onPress={() => this.sendMessage()}></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
