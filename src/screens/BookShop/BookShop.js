import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { firebase } from '../../firebase/config';

 export default class BookShop extends Component {
  state = {
    books: {}
  }

  componentDidMount = () => {
    firebase
        .firestore()
        .collection("users")
        .doc(this.props.user.id)
        .collection("books")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let bookData = (doc.id, "=>", doc.data())
                this.setState({ books: bookData})
            })
        })
  }

    
    render() {
      const { bookImage } = this.state.books
      console.log(bookImage)
      return (
          <View>
            <Text>Home screen</Text>
            <Image source={{uri: bookImage}} style={{width: 200, height: 200}} />
          </View>
      )
    };
  }

  