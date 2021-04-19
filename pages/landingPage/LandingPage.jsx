import React from "react";
import { Text, View, StyleSheet } from "react-native";

const LandingPage = () => {
  return (
    <View style={[style.container, { flexDirection: "column" }]}>
      <View style={style.top}>This</View>
      <View style={style.middle}>is</View>
      <View style={style.bottom}>hard</View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 20,
  },

  top: {
    flex: 1,
    backgroundColor: "green",
  },
  middle: {
    flex: 3,
    backgroundColor: "orange",
  },
  bottom: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default LandingPage;
