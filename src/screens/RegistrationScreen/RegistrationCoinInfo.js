import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default class RegistrationCoinInfo extends Component {
  state = {
    myBooks: [],
  };

  nextPage = () => {
    this.props.navigation.navigate("EcoBooks", {
      user: this.props.route.params,
    });
  };

  render() {
    return (
      <View>
        <Text>
          Instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </Text>
        <TouchableOpacity onPress={this.nextPage}>
          <Text>Get started!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
