import React, { Component } from 'react';
import { View } from 'react-native';
import { firebase } from '../../firebase/config';
import { default as Book } from '../Book/Book';

 export default class BookShop extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let usersBooks = [];
            let userId = doc.id;
            firebase.firestore()
            .collection("users")
            .doc(userId)
            .collection("books")
            .get()
            .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const bookData = doc.data()
              usersBooks.push(bookData)
              })
              this.setState((currentState) => {
                const updatedBooks = [...currentState.books, ...usersBooks];
                return { books: updatedBooks};
              })
            })
          })
        })
  }
    
    render() {
      const { bookImage, bookDescription, bookAuthor, bookTitle } = this.state.books
      console.log(this.state)
      return this.state.books.map((book) => {
        return (
            <View>
              <Book bookDescription={book.bookDescription} bookImage={book.bookImage} bookAuthor={book.bookAuthor} bookTitle={book.bookTitle}/>
            </View>
        )
      })
    };
  }

  