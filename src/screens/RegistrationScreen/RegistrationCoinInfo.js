import React, { Component } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { firebase } from "../../firebase/config";

export default class RegistrationCoinInfo extends Component {
  state = {
    myBooks: [],
    isLoading: true,
    bookId: "",
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
          const bookId = doc.id;
          return this.setState({
            myBooks: bookData,
            isLoading: false,
            bookId: bookId,
          });
        });
      });
  };

  handleBookCoin = (text) => {
    if (text > 0 && text < 6) {
      const book = this.state.myBooks;
      book.bookValue = text * 1;
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.route.params.userData.id)
        .collection("books")
        .doc(this.state.bookId)
        .set(book);
    } else {
      alert("This is an invalid BookCoin value, please re-enter!");
    }
  };

  nextPage = () => {
    this.props.navigation.navigate("EcoBooks", {
      user: this.props.route.params,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <></>;
    }

    return (
      <View>
        <Text>Welcome to EcoBooks!</Text>
        <Text>
          EcoBooks is a book trading app where we encourage you to read, walk
          and recycle! Each book in our BookShop is worth BookCoins, which you
          can earn by walking.
        </Text>
        <Text>
          You have added {this.state.myBooks.bookTitle} for sale, please add how
          many BookCoins you would like to sell your book for. Book value must
          be between 1 to 5 BookCoins.
        </Text>
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
