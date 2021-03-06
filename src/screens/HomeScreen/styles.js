import { StyleSheet } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#424242",
  },

  profile_image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 10,
  },

  list_image: {
    width: 100,
    height: 100,
  },

  token_number: {
    width: 75,
    height: 75,
    backgroundColor: "#D7DFDF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 50,
  },

  token_text: {
    color: "#3F3F3F",
    fontSize: 45,
  },
  // formContainer: {
  //     flexDirection: 'row',
  //     height: 80,
  //     marginTop: 40,
  //     marginBottom: 20,
  //     flex: 1,
  //     paddingTop: 10,
  //     paddingBottom: 10,
  //     paddingLeft: 30,
  //     paddingRight: 30,
  //     justifyContent: 'center',
  //     alignItems: 'center'
  // },
  // input: {
  //     height: 48,
  //     borderRadius: 5,
  //     overflow: 'hidden',
  //     backgroundColor: 'white',
  //     paddingLeft: 16,
  //     flex: 1,
  //     marginRight: 5
  // },
  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#F1F1F1",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  // buttonText: {
  //     color: 'white',
  //     fontSize: 16
  // },
  // listContainer: {
  //     marginTop: 20,
  //     padding: 20,
  // },
  // entityContainer: {
  //     marginTop: 16,
  //     borderBottomColor: '#cccccc',
  //     borderBottomWidth: 1,
  //     paddingBottom: 16
  // },
  // entityText: {
  //     fontSize: 20,
  //     color: '#333333'
  // }
});
