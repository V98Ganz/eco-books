import React from "react";
import {
  Button,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { firebase } from "../../firebase/config";
import { default as ConversationScreen } from "../ConversationScreen/ConversationScreen";
import styles from "./styles";

export default class ChatMessengerScreen extends React.Component {
  state = {
    renderOneConversation: false,
    convoIds: [],
    roomId: null,
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
    this.getCurrentConversations((conversations) => {
      this.setState({ convoIds: conversations });
    });
  }

  getCurrentConversations = async (cb) => {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("active-conversations")
      .onSnapshot((querySnapshot) => {
        const conversation = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          return firebaseData;
        });
        cb(conversation);
      });

    return snapshot;
  };

  render() {
    const roomzz = this.state.convoIds;

    const currentUser = this.props.user.id;
    const currentUserName = this.props.user.fullName;
    const bookOwnerId = this.props.bookOwnerId;

    if (this.state.renderOneConversation === false) {
      if (roomzz) {
        return (
          <ScrollView>
            {roomzz.map((array) => {
              return (
                <View style={styles.roomLink} key={array.roomId}>
                  <Image
                    style={styles.eco_logo}
                    source={require("../../img/ecobooks.png")}
                  ></Image>
                  <Text style={styles.chat_link_text}>{array.to}</Text>
                  <TouchableOpacity
                    style={styles.chat_button}
                    onPress={() => this.goToChat(array.roomId)}
                  >
                    <Text style={styles.chat_button_text}>Enter Chat</Text>
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
          <Button title="Go back!" onPress={() => this.goBack()} />
          <ConversationScreen
            sender={currentUser}
            receiver={bookOwnerId}
            roomId={this.state.roomId}
            senderName={currentUserName}
          />
        </View>
      );
    }
  }
}
