import React, { Component } from 'react';
import { View } from 'react-native';
import { firebase } from '../../firebase/config';
import { default as Book } from '../Book/Book';

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
      const { bookImage, bookDescription, bookAuthor, bookTitle } = this.state.books
      
      return (
          <View>
            <Book bookDescription={bookDescription} bookImage={bookImage} bookAuthor={bookAuthor} bookTitle={bookTitle}/>
          </View>
      )
    };
  }

  