import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
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
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
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
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },

  // REG COIN INFO POP UP

  eco_logo: {
    width: 100,
    height: 80,
    marginTop: 30,
  },

  content_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  welcome_text: {
    marginTop: 20,
    fontSize: 30,
    textDecorationLine: "underline",
    textDecorationColor: "#389f30",
  },

  eco_about: {
    fontSize: 20,
    padding: 20,
    lineHeight: 27,
    letterSpacing: 1,
  },

  line_break: {
    width: "70%",
    height: 1,
    backgroundColor: "#3f3f3f",
    marginTop: 20,
    marginBottom: 20,
  },

  coin_amount_entry: {
    height: 55,
    width: 120,
    borderWidth: 3,
    borderColor: "#3f3f3f",
    padding: 15,
    marginTop: 20,
    fontSize: 25,
  },

  get_started_button: {
    marginBottom: 30,
    marginTop: 30,
    height: 50,
    width: 150,
    backgroundColor: "#389f30",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  button_text: {
    color: "#ffffff",
    fontSize: 20,
  },

  image_background: {
    flex: 1,
    resizeMode: "cover",
  },

  scrollview: {
    marginHorizontal: 10,
  },
});
