import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";
import { fetchBooks } from "../../utils/utils";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCondition, setBookCondition] = useState("Brand new");
  // const [bookImage, setBookImage] = useState("");
  // const [isValid, setIsValid] = useState(true);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    fetchBooks(bookTitle, bookAuthor)
      .then((bookInfo) => {
        return Promise.all([
          firebase.auth().createUserWithEmailAndPassword(email, password),
          bookInfo,
        ]);
      })
      .then(([response, bookInfo]) => {
        const uid = response.user.uid;
        const userData = {
          id: uid,
          email,
          fullName,
          coins: 0,
        };

        const booksData = {
          bookTitle: bookInfo.title || "no title found",
          bookAuthor: bookInfo.authors[0] || "no author found",
          bookDescription: bookInfo.description || "no description found",
          bookImage: bookInfo.imageLinks.thumbnail || "no images found",
          bookCondition: bookCondition,
        };

        const usersRef = firebase.firestore().collection("users");
        return Promise.all([
          userData,
          usersRef.doc(userData.id).set(userData),
          usersRef
            .doc(userData.id)
            .collection("books")
            .doc(bookTitle)
            .set(booksData),
        ]);
      })
      .then(([userData]) => {
        navigation.navigate("RegistrationCoinInfo", { userData });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} source={require("../../img/ecobooks.png")} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.insertBookText}>Please Insert Your Books</Text>

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
        <Picker
          selectedValue={bookCondition}
          onValueChange={(currentCondition) =>
            setBookCondition(currentCondition)
          }
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
