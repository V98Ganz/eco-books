import React, { Component } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { firebase } from "../../firebase/config";

export default class MyBooksCarousel extends Component {
  state = {
    myBooks: [],
    isLoading: true,
  };

  _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={{ uri: item.bookImage }}
          style={{ width: 295, height: 450, resizeMode: "contain" }}
        />
      </View>
    );
  };

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("books")
      .get()
      .then((querySnapshot) => {
        const myBooks = [];
        querySnapshot.forEach((doc) => {
          const bookData = doc.data();
          myBooks.push(bookData);
        });
        return this.setState({ myBooks: myBooks, isLoading: false });
      });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.addedBook !== this.props.addedBook) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.user.id)
        .collection("books")
        .get()
        .then((querySnapshot) => {
          const myBooks = [];
          querySnapshot.forEach((doc) => {
            const bookData = doc.data();
            myBooks.push(bookData);
          });
          return this.setState({ myBooks: myBooks, isLoading: false });
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <></>;
    }

    return (
      <View>
        <Carousel
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          data={this.state.myBooks}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get("window").width}
          sliderHeight={450}
          itemWidth={300}
        />
      </View>
    );
  }
}
