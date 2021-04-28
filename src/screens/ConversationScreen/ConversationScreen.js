import {
  Button,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
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
    const { senderName } = this.props;
    const { convo, senderMessage } = this.state;
    return (
      <ScrollView style={styles.chatLog}>
        <View>
          {convo.map((convObj) => {
            return (
              <View key={convObj.id || "no id found here"}>
                <SingleMessage
                  sentBy={convObj.sentBy}
                  value={convObj.text}
                  senderName={senderName}
                />
              </View>
            );
          })}
          <View style={styles.send_message_section}>
            <TextInput
              style={styles.text_input}
              placeholder="Type your message..."
              placeholderTextColor="#3f3f3f"
              onChangeText={this.onChange}
              clearButtonMode="always"
              value={senderMessage}
            ></TextInput>
            <TouchableOpacity
              style={styles.send_button}
              title="Send"
              onPress={() => this.sendMessage()}
            >
              <Text style={styles.send_button_text}> Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
