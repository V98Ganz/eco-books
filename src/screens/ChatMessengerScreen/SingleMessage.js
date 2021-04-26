import React from "react";
import { View, Text } from "react-native";

function SingleMessage(props) {
  console.log(props);
  return (
    <View>
      <Text>{props.sentBy}</Text>
      <Text>{props.value}</Text>
    </View>
  );
}

export default SingleMessage;
