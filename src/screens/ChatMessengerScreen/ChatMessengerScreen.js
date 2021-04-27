import React from "react";
import { Button, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { firebase } from "../../firebase/config";
import { default as ConversationScreen } from "../ConversationScreen/ConversationScreen";
import styles from "./styles";

const receiverTestIdChangeWhenPossible = "WhHlWCsnrIhUGEaKt2XQ8MfyrFi2";

export default class ChatMessengerScreen extends React.Component {
  state = {
    renderOneConversation: false,
    convoIds: [],
    roomId: null,
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

  queryCheck = async (senderId, receiverId, roomId) => {
    const result = await this.checkDataBaseForChatRoom(senderId, receiverId);
    const isThereARoom = await result.find((item) => item === true);
    if (isThereARoom) {
      this.goToChat(roomId);
    } else {
      this.startChat(senderId, receiverId);
    }
  };

  goToChat = (roomId) => {
    this.setState({
      renderOneConversation: true,
      roomId: roomId,
    });
  };

  goBack = () => {
    this.setState({
      renderOneConversation: false,
    });
  };

  componentDidMount() {
    this.getCurrentConversations().then((conversations) => {
      this.setState({ convoIds: conversations });
    });
  }

  getCurrentConversations = async () => {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("active-conversations")
      .get();
    const conversation = {};

    snapshot.forEach((doc) => {
      conversation[doc.id] = doc.data();
    });

    return conversation;
  };

  startChat = (senderId, receiverId) => {
    firebase
      .firestore()
      .collection("chatRooms")
      .add({
        users: [senderId, receiverId],
      })
      .then((doc) => {
        firebase
          .firestore()
          .collection("users")
          .doc(id)
          .collection("active-conversations")
          .doc(doc.id)
          .update({
            roomId: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
        firebase
          .firestore()
          .collection("users")
          .doc(receiverId)
          .collection("active-conversations")
          .doc(doc.id)
          .update({
            roomId: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
      })
      .then(() => {
        this.goToChat();
      });
  };

  render() {
    const roomzz = this.state.convoIds;
    const roomzzEntries = Object.entries(roomzz);
    const currentUser = this.props.user.id;
    const currentUserName = this.props.user.fullName;

    //console.log(currentUserName);

    if (this.state.renderOneConversation === false) {
      if (roomzz) {
        return (
          <ScrollView>
            {roomzzEntries.map((array) => {
              return (
                <View style={styles.roomLink} key={array[0]}>
                  <Text style={styles.chat_link_text}>{array[1].to}</Text>
                  <TouchableOpacity
                    style={styles.chat_button}
                    onPress={() =>
                      this.queryCheck(
                        currentUser,
                        receiverTestIdChangeWhenPossible,
                        array[0]
                      )
                    }
                  >
                    <Text>Enter Chat</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        );
      } else {
        return <Text>LOADING</Text>;
      }
    } else if (this.state.renderOneConversation === true) {
      return (
        <View>
          {/* <Text>Go back</Text> */}
          <Button title="Go back!" onPress={() => this.goBack()} />
          <ConversationScreen
            sender={currentUser}
            receiver={receiverTestIdChangeWhenPossible}
            roomId={this.state.roomId}
            senderName={currentUserName}
          />
        </View>
      );
    }
  }
}

// export default ChatMessengerScreen;

// <View>
//   {/* <Text>Press to send message!</Text>
//   <Button
//     title="Message"
//     onPress={() =>
//       this.checkDataBaseForChatRoom(
//         currentUser,
//         "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1"
//       )
//     }
//   /> */}
// </View>