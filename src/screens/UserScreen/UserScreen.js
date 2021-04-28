import React, { Component } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddBookFrom from "./AddBookForm";
import MyBooksCarousel from "./MyBooksCarousel";

export default class UserScreen extends Component {
  state = {
    showingMyBooks: false,
    showingEcobookInstructions: false,
    showingAddNewBook: false,
    addedNewBook: false,
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

  updateAddedNewBook = () => {
    this.setState((currentState) => {
      if (currentState.addedNewBook) {
        return { addedNewBook: false };
        r;
      } else {
        return { addedNewBook: true };
      }
    });
  };

  render() {
    return (
      <View>
        <KeyboardAwareScrollView>
          <Text>Welcome back {this.props.user.fullName}!</Text>
          <Text onPress={this.viewEcobookInstructions}>
            How does EcoBooks work?
          </Text>
          {this.state.showingEcobookInstructions ? (
            <Text>
              Ecobooks is an app where you can buy and sell books. Instead of
              using money, you can make Bookcoins by walkings. Walking 100 steps
              can earn you one bookCoin. With this money you are able to then
              buy and sell your loved and used books to others.
            </Text>
          ) : null}
          <Text onPress={this.viewMyBooks}>Your Books</Text>
          {this.state.showingMyBooks ? (
            <MyBooksCarousel
              user={this.props.user}
              addedBook={this.state.addedNewBook}
            />
          ) : null}
          <Text onPress={this.viewAddNewBooks}>Add a new Book!</Text>
          {this.state.showingAddNewBook ? (
            <AddBookFrom
              user={this.props.user}
              updateAddedNewBook={this.updateAddedNewBook}
            />
          ) : null}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
