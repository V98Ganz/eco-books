import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { firebase } from "../../firebase/config";
import BookCardInfo from "./BookCardInfo";

export default class BookShop extends Component {
  state = {
    books: [],
  };

  alertBookShop = (bookId) => {
    const updatedBooks = this.state.books.filter(
      (book) => book.bookId !== bookId
    );
    this.setState({ books: updatedBooks });
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
          bookOwnerName={item.ownerFullName}
          navigation={this.props.navigation}
          alertBookShop={this.alertBookShop}
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
          let userFullName = doc.data();
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
                bookData.ownerFullName = userFullName.fullName;
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
      <ImageBackground style={styles.image_background}>
        <View style={styles.bookshopBackground}>
          <Image
            source={require("../../img/ecobooks.png")}
            style={styles.homescreen_logo}
          />
          <Carousel
            style={styles.carousel_styling}
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.books}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get("window").width}
            sliderHeight={450}
            itemWidth={300}
          />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 40,
    overflow: "scroll",
    height: 450,
    borderRadius: 10,
  },
  bookshopBackground: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  homescreen_logo: {
    margin: 30,
    width: 130,
    height: 100,
  },

  image_background: {
    flex: 1,
    resizeMode: "cover",
  },
});
