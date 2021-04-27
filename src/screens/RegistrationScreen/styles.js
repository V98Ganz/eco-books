import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  logo: {
    flex: 1,
    height: 200,
    width: 275,
    alignSelf: "center",
    margin: 30,
    paddingTop: 80,
    paddingBottom: 80,
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
    backgroundColor: "green",
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
  insertBookText: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 120,
    color: "#aaaaaa",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 80,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
});
