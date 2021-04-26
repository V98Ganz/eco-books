import React from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { firebase } from "../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { default as ConversationScreen } from "../ConversationScreen/ConversationScreen";

const Stack = createStackNavigator();

export default class ChatMessengerScreen extends React.Component {
  state = {
    renderOneConversation: false,
    convoIds: [],
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
          .set({
            a: doc.id,
          });
        firebase
          .firestore()
          .collection("users")
          .doc("ivBQI1QUGDOZM6j9kpIs9Cwa6zy1")
          .collection("active-conversations")
          .doc("conversations")
          .set({
            a: doc.id,
          });
      })
      .then(() => {
        this.goToChat();
      });
  };

  render() {
    const { roomId } = this.state.convoIds;
    console.log(roomId);
    const currentUser = this.props.user.id;
    if (this.state.renderOneConversation === false) {
      if (roomId) {
        return (
          <ScrollView>
            {roomId.map((room) => {
              return <Text key={room}>{room}</Text>;
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
