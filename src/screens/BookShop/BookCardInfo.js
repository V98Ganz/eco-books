import React, { Component } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { firebase } from "../../firebase/config";
import BuyBooks from "./BuyBooks";
import { default as MessageSeller } from "./MessageSeller";

export default class BookCardInfo extends Component {
  state = {
    showingPicture: true,
  };

  changeView = () => {
    this.setState((currentState) => {
      if (currentState.showingPicture) {
        return { showingPicture: false };
      } else {
        return { showingPicture: true };
      }
    });
  };

  goBack = () => {
    this.setState({
      renderChatMessengerScreen: false,
    });
  };

  render() {
    return (
      <View>
        {this.state.showingPicture ? (
          <TouchableOpacity onPress={this.changeView}>
            <Image
              source={{ uri: this.props.bookImage }}
              style={{ width: 295, height: 450, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        ) : (
          <ScrollView style={styles.bookInfo}>
            <TouchableOpacity onPress={this.changeView}>
              <Text style={styles.title}>{this.props.bookTitle}</Text>
              <Text style={styles.author}>by {this.props.bookAuthor}</Text>
              <Text style={styles.bookcoins}>
                Book costs {this.props.bookValue} BookCoins
              </Text>
              <Text style={styles.description}>
                {this.props.bookDescription}
              </Text>
              <Text style={styles.condition}>
                Book Condition: {this.props.bookCondition}
              </Text>
              <Text style={styles.location}>
                Book pickup location: {this.props.bookLocation}
              </Text>
              <MessageSeller
                user={this.props.user}
                bookOwnerId={this.props.bookOwnerId}
                bookOwnerName={this.props.bookOwnerName}
                navigation={this.props.navigation}
              />
              <BuyBooks
                bookCost={this.props.bookValue}
                user={this.props.user}
                bookOwnerId={this.props.bookOwnerId}
                bookTitle={this.props.bookTitle}
                bookId={this.props.bookId}
                bookOwnerName={this.props.bookOwnerName}
                navigation={this.props.navigation}
              />
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookInfo: {
    overflow: "scroll",
    height: 450,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  author: {
    fontStyle: "italic",
    fontSize: 15,
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
    margin: 12,
  },
  condition: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 12,
  },
  message: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  bookcoins: {
    fontWeight: "bold",
    textAlign: "center",
  },
  location: {
    textAlign: "center",
  },
});
