import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { firebase } from "../../firebase/config";

export default class RegistrationCoinInfo extends Component {
  state = {
    myBooks: [],
    bookValue: 0,
    isLoading: true
  };

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.route.params.userData.id)
      .collection("books")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const bookData = doc.data();
          return this.setState({ myBooks: bookData, isLoading: false });
        });
      });
  };

  handleBookCoin = (text) => {
    this.setState({bookValue: text})
  }

  nextPage = () => {
    this.props.navigation.navigate("EcoBooks", {
      user: this.props.route.params,
    });
  };

  render() {
    console.log(this.state.bookValue)
    if (this.state.isLoading) {
      return <></>;
    }
    
    return (
      <View>
        <Text>Welcome to EcoBooks!</Text>
        <Text>
          Here is how everything works...
        </Text>
        <Text>You have added {this.state.myBooks.bookTitle} for sale, please add how many BookCoins you would like to sell your book for.</Text>
        <Image
          source={{ uri: this.state.myBooks.bookImage }}
          style={{ width: 295, height: 450, resizeMode: "contain" }}
        />
        <TextInput
          placeholderTextColor="#aaaaaa"
          placeholder="Input BookCoin price"
          onChangeText={this.handleBookCoin}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={this.nextPage}>
          <Text>Get started!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
