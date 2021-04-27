import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function SingleMessage(props) {
  return (
    <View>
      <View style={styles.message}>
        <Text>{props.senderName}</Text>
        <Text>{props.value}</Text>
      </View>
    </View>
  );
}

export default SingleMessage;
