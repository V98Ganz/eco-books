import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // universal styles
  section_headers: {
    fontSize: 25,
    color: "#3f3f3f",
    padding: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },

  welcome_message: {
    fontSize: 25,
    color: "#3f3f3f",
    padding: 15,
  },

  // how ecobooks works section

  content_container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    height: "100%",
  },

  about_ecobooks: {
    fontSize: 23,
    fontWeight: "800",
    color: "#3f3f3f",
    padding: 20,
    lineHeight: 35,
    textAlign: "center",
  },

  section_icons: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },

  // styling for adding a book form

  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  button: {
    backgroundColor: "#389F30",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
