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
  text_input: {
    height: 40,
    backgroundColor: "#f7f7f7",
    color: "#3f3f3f",
    width: "80%",
    borderRadius: 50,
    padding: 10,
  },

  send_message: {
    flexDirection: "row",
  },
});
