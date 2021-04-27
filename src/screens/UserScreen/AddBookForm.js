import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";
import { fetchBooks } from "../../utils/utils";
import styles from "../RegistrationScreen/styles";

export default function AddBookFrom(props) {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCondition, setBookCondition] = useState("Brand new");
  const [bookValue, setBookValue] = useState("");
  const [bookLocation, setBookLocation] = useState("");
  
  
  const onAddBook = () => {
    
    if (bookValue > 0 && bookValue < 6) {
  
    fetchBooks(bookTitle, bookAuthor)
      .then((bookInfo) => {
        const booksData = {
          bookTitle: bookInfo.title || "no title found",
          bookAuthor: bookInfo.authors[0] || "no author found",
          bookDescription: bookInfo.description || "no description found",
          bookImage: bookInfo.imageLinks.thumbnail || "no images found",
          bookCondition: bookCondition,
          bookValue: bookValue,
          bookLocation: bookLocation,
        };
        firebase
          .firestore()
          .collection("users")

          .doc(props.user.id)
          .collection("books")
          .doc(bookTitle)
          .set(booksData);
      })
      .then(() => {
        alert("Your book has been added");
        props.updateAddedNewBook()
        setBookTitle("")
        setBookAuthor("")
        setBookValue("")
        setBookLocation("")
      })
    
      .catch((error) => {
        alert(error);
      });
    } else {
      alert("This is an invalid BookCoin value, please re-enter!")
    }
  };

  return (
    <View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      ></KeyboardAwareScrollView>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder="Input book Title"
        onChangeText={(text) => setBookTitle(text)}
        value={bookTitle}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder="Input book Author"
        onChangeText={(text) => setBookAuthor(text)}
        value={bookAuthor}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
       <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder="Input book value"
        onChangeText={(text) => setBookValue(text)}
        value={bookValue}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        placeholder="Input book pickup location"
        onChangeText={(text) => setBookLocation(text)}
        value={bookLocation}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <Picker
        selectedValue={bookCondition}
        onValueChange={(currentCondition) => setBookCondition(currentCondition)}
      >
        <Picker.Item label="Brand new" value="Brand new" />
        <Picker.Item
          label="Used with slight wear"
          value="Used with slight wear"
        />
        <Picker.Item
          label="Fair wear and tear, all pages present"
          value="Fair wear and tear, all pages present"
        />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={() => onAddBook()}>
        <Text style={styles.buttonTitle}>Add new book</Text>
      </TouchableOpacity>
    </View>
  );
}
