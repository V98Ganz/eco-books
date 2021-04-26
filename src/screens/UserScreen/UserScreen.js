import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { firebase } from "../../firebase/config";
import AddBookFrom from "./AddBookForm";

export default class UserScreen extends Component {
  state = {
    myBooks: [],
    isLoading: true,
    showingMyBooks: false,
    showingEcobookInstructions: false,
    showingAddNewBook: false,
  };

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("books")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const bookData = doc.data();
          return this.setState({ myBooks: [bookData], isLoading: false });
        });
      });
  };

  viewMyBooks = () => {
    this.setState((currentState) => {
      if (currentState.showingMyBooks) {
        return { showingMyBooks: false };
        r;
      } else {
        return { showingMyBooks: true };
      }
    });
  };

  viewEcobookInstructions = () => {
    this.setState((currentState) => {
      if (currentState.showingEcobookInstructions) {
        return { showingEcobookInstructions: false };
        r;
      } else {
        return { showingEcobookInstructions: true };
      }
    });
  };

  viewAddNewBooks = () => {
    this.setState((currentState) => {
      if (currentState.showingAddNewBook) {
        return { showingAddNewBook: false };
        r;
      } else {
        return { showingAddNewBook: true };
      }
    });
  };

  render() {
    if (this.state.isLoading) {
      return <></>;
    }
    return (
      <View>
        <Text>Welcome back {this.props.user.fullName}!</Text>
        <Text onPress={this.viewEcobookInstructions}>
          How does EcoBooks work?
        </Text>
        {this.state.showingEcobookInstructions ? (
          <Text>
            Ecobooks is an app where you can buy and sell books. Instead of
            using money, you can make Bookcoins by walkings. Walking 100 steps
            can earn you one bookCoin. With this money you are able to then buy
            and sell your loved and used books to others.
          </Text>
        ) : null}
        <Text onPress={this.viewMyBooks}>Your Books</Text>
        {this.state.showingMyBooks ? (
          <Image
            source={{ uri: this.state.myBooks[0].bookImage }}
            style={{ width: 200, height: 200 }}
          />
        ) : null}
        <Text onPress={this.viewAddNewBooks}>Add a new Book!</Text>
        {this.state.showingAddNewBook ? (
          <AddBookFrom user={this.props.user} />
        ) : null}
      </View>
    );
  }
}
