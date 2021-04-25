import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { firebase } from "../../firebase/config";
import styles from "../LoginScreen/styles";

export default class BookShop extends Component {
  state = {
    books: [],
    showingPicture: true,
  };

  changeState = () => {
    this.setState((currentState) => {
      if (currentState.showingPicture) {
        return { showingPicture: false };
      } else {
        return { showingPicture: true };
      }
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item.bookImage }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>{item.bookAuthor}</Text>
        <Text style={styles.title}>{item.bookTitle}</Text>
        <Text stlye={styles.body}>{item.bookDescription}</Text>
        <Text style={styles.title}>{item.bookCondition}</Text>
      </View>
    );
  };

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let usersBooks = [];
          let userId = doc.id;
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("books")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const bookData = doc.data();
                usersBooks.push(bookData);
              });
              this.setState((currentState) => {
                const updatedBooks = [...currentState.books, ...usersBooks];
                return { books: updatedBooks };
              });
            });
        });
      });
  };

  render() {
    return (
      <View>
        <Carousel
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          data={this.state.books}
          renderItem={this._renderItem}
          sliderWidth={300}
          itemWidth={300}
        />
      </View>
    );
  }
}
