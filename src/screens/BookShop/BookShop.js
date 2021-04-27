import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { firebase } from "../../firebase/config";
import BookCardInfo from "./BookCardInfo";

export default class BookShop extends Component {
  state = {
    books: [],
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <BookCardInfo
          bookAuthor={item.bookAuthor}
          bookImage={item.bookImage}
          bookTitle={item.bookTitle}
          bookDescription={item.bookDescription}
          bookValue={item.bookValue}
          bookCondition={item.bookCondition}
          bookLocation={item.bookLocation}
          bookOwnerId={item.userId}
          user={this.props.user}
          bookId={item.bookId}
        />
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
                bookData.userId = userId;
                bookData.bookId = doc.id;
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
      <View style={styles.bookshopBackground}>
        <Carousel
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          data={this.state.books}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get("window").width}
          sliderHeight={450}
          itemWidth={300}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 100,
    overflow: "scroll",
    height: 450,
    borderRadius: 10,
  },
  bookshopBackground: {
    backgroundColor: "#1c9f5e",
  },
});
