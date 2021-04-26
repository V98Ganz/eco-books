import React from "react";
import { Button, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { firebase } from "../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { default as ConversationScreen } from "../ConversationScreen/ConversationScreen";
import styles from "./styles";

const Stack = createStackNavigator();

export default class ChatMessengerScreen extends React.Component {
  state = {
    renderOneConversation: false,
    convoIds: {},
    roomId: null,
  };

  checkDataBaseForChatRoom = async (senderId, receiverId, roomId) => {
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
    isMatched === true ? this.goToChat(roomId) : this.startChat(senderId);
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
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("active-conversations")
      .doc("conversations")
      .get()
      .then((doc) => {
        this.setState({ convoIds: doc.data() });
      });
  }

  startChat = (id) => {
    firebase
      .firestore()
      .collection("chatRooms")
      .add({
        users: [id, "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1"],
      })
      .then((doc) => {
        firebase
          .firestore()
          .collection("users")
          .doc(id)
          .collection("active-conversations")
          .doc("conversations")
          .add({
            [doc.id]: doc.id,
          });
        firebase
          .firestore()
          .collection("users")
          .doc("ivBQI1QUGDOZM6j9kpIs9Cwa6zy1")
          .collection("active-conversations")
          .doc("conversations")
          .add({
            [doc.id]: doc.id,
          });
      })
      .then(() => {
        this.goToChat();
      });
  };

  render() {
    console.log(this.state.convoIds);
    const { roomId } = this.state.convoIds;
    const currentUser = this.props.user.id;
    if (this.state.renderOneConversation === false) {
      if (roomId) {
        return (
          <ScrollView>
            {roomId.map((room) => {
              return (
                <View style={styles.roomLink} key={room}>
                  <Text style={styles.chat_link_text}>{room}</Text>
                  <TouchableOpacity
                    style={styles.chat_button}
                    onPress={() =>
                      this.checkDataBaseForChatRoom(
                        currentUser,
                        "ivBQI1QUGDOZM6j9kpIs9Cwa6zy1",
                        room
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
          <Text>Go back</Text>
          <Button title="Go back!" onPress={() => this.goBack()} />
          <ConversationScreen
            sender={currentUser}
            receiver={"ivBQI1QUGDOZM6j9kpIs9Cwa6zy1"}
            roomId={this.state.roomId}
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
