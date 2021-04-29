import { StyleSheet } from "react-native";

export default StyleSheet.create({
  roomLink: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    backgroundColor: "#3f3f3f",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eco_logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 30,
  },

  chat_button: {
    backgroundColor: "#389f30",
    height: 50,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },

  chat_button_text: {
    color: "#ffffff",
    fontSize: 17,
  },

  chat_link_text: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  // conversation screen styling
  chatLog: {
    height: "100%",
  },

  text_input: {
    height: 40,
    backgroundColor: "#f7f7f7",
    color: "#3f3f3f",
    width: "70%",
    borderRadius: 50,
    padding: 10,
  },
  // SENDER
  text_bubble: {
    backgroundColor: "#389f30",
    padding: 10,
    marginLeft: "45%",
    borderRadius: 5,
    //marginBottom: 15,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: "50%",
    alignSelf: "flex-end",
    //maxWidth: 500,

    borderRadius: 20,
  },

  bubble_text: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },

  receiver: {
    fontSize: 16,
    color: "#C4F74F",
  },
  // receiver MESSAGES
  text_bubble_receiver: {
    backgroundColor: "#3f3f3f",
    padding: 10,
    marginRight: "45%",
    borderRadius: 5,
    //marginBottom: 15,
    marginTop: 5,
    marginLeft: "5%",
    maxWidth: "50%",
    alignSelf: "flex-start",
    //maxWidth: 500,

    borderRadius: 20,
  },

  bubble_text_receiver: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },

  receiver_name: {
    color: "#C9C9C9",
    fontSize: 16,
  },

  //send message text input and send button

  send_message_section: {
    flexDirection: "row",
    // position: "absolute",
    // top: 670,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  send_button_text: {
    fontSize: 16,
  },
});
