import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background_img: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  //   container: {
  //     flex: 1,
  //     flexDirection: "column",
  //     backgroundColor: "#fff",
  //   },

  title: {
    fontSize: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    // borderWidth: 2,
    // borderColor: "#ffffff",
  },

  title_top: {
    fontSize: 25,
    marginTop: 20,
    color: "#ffffff",
  },

  coincount_wrapper: {
    // borderWidth: 3,
    // borderColor: "#ffffff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 50,
  },

  coin_amount: {
    color: "#ffffff",
    fontSize: 20,
  },

  start_button: {
    backgroundColor: "#91D675",
    width: 130,
    height: 130,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  stop_button: {
    backgroundColor: "#EC5E55",
    width: 130,
    height: 130,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },

  button_text: {
    color: "#ffffff",
    fontSize: 25,
  },

  currentStepCount: {
    color: "#ffffff",
    fontSize: 50,
  },

  center_things: {
    justifyContent: "center",
    alignItems: "center",
  },
});
