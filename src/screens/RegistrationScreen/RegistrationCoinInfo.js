import React, { Component } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";

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
      <ScrollView style={styles.scrollview}>
        <ImageBackground
          style={styles.image_background}
          source={{
            uri:
              "https://images.unsplash.com/photo-1515549832467-8783363e19b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=582&q=80",
          }}
        >
          <View style={styles.content_container}>
            <Image
              style={styles.eco_logo}
              source={require("../../img/ecobooks.png")}
            ></Image>
            <Text style={styles.welcome_text}>Welcome to EcoBooks!</Text>
            <Text style={styles.eco_about}>
              EcoBooks is a book trading app where we encourage you to read,
              walk and recycle! Each book in our BookShop is worth BookCoins,
              which you can earn by walking.
            </Text>
            <View style={styles.line_break}></View>
            <Text style={styles.eco_about}>
              You have added {this.state.myBooks.bookTitle} for sale, please add
              how many BookCoins you would like to sell your book for. Book
              value must be between 1 to 5 BookCoins.
            </Text>
            <Image
              source={{ uri: this.state.myBooks.bookImage }}
              style={{ width: 295, height: 450, resizeMode: "contain" }}
            />
            <TextInput
              placeholderTextColor="#aaaaaa"
              placeholder="Value..."
              onChangeText={this.handleBookCoin}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              style={styles.coin_amount_entry}
            />
            <TouchableOpacity
              style={styles.get_started_button}
              onPress={this.nextPage}
            >
              <Text style={styles.button_text}>Get started!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
