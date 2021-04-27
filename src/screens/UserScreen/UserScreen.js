import React, { Component } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddBookFrom from "./AddBookForm";
import MyBooksCarousel from "./MyBooksCarousel";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faQuestionCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CardStyleInterpolators } from "@react-navigation/stack";

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
      <View style={styles.content_container}>
        <KeyboardAwareScrollView>
          <Text>Welcome back {this.props.user.fullName}!</Text>
          <View style={styles.section_icons}>
            <FontAwesomeIcon icon={faQuestionCircle} size={70} />
          </View>
          <Text
            style={styles.section_headers}
            onPress={this.viewEcobookInstructions}
          >
            How does EcoBooks work?
          </Text>
          {this.state.showingEcobookInstructions ? (
            <Text style={styles.about_ecobooks}>
              Ecobooks is an app where you can buy and sell books. Instead of
              using money, you can make Bookcoins by walkings. Walking 100 steps
              can earn you one bookCoin. With this money you are able to then
              buy and sell your loved and used books to others.
            </Text>
          ) : null}
          <View style={styles.section_icons}>
            <FontAwesomeIcon icon={faBook} size={70} />
          </View>
          <Text style={styles.section_headers} onPress={this.viewMyBooks}>
            Your Books
          </Text>
          {this.state.showingMyBooks ? (
            <MyBooksCarousel
              user={this.props.user}
              addedBook={this.state.addedNewBook}
            />
          ) : null}
          <View style={styles.section_icons}>
            <FontAwesomeIcon icon={faPlusCircle} size={70} />
          </View>
          <Text style={styles.section_headers} onPress={this.viewAddNewBooks}>
            Add a new Book!
          </Text>
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
