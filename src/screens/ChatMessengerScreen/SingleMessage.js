import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function SingleMessage(props) {
  const { senderName, sentBy } = props;
  if (senderName === sentBy) {
    return (
      <View>
        <View style={styles.text_bubble}>
          <Text style={styles.receiver}>{props.sentBy}</Text>
          <Text style={styles.bubble_text}>{props.value}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.text_bubble_receiver}>
          <Text style={styles.receiver_name}>{props.sentBy}</Text>
          <Text style={styles.bubble_text_receiver}>{props.value}</Text>
        </View>
      </View>
    );
  }
}

export default SingleMessage;
