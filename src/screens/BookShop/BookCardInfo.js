import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
              <Text>{this.props.bookTitle}</Text>
              <Text>by {this.props.bookAuthor}</Text>
              <Text>{this.props.bookDescription}</Text>
              <Text>Book Condition: {this.props.bookCondition}</Text>
              <Text>Send seller a message!</Text>
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
  },
});
