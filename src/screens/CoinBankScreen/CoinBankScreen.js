import { Pedometer } from "expo-sensors";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { firebase } from "../../firebase/config";

const Separator = () => <View style={styles.separator} />;

export default class PedometerScreen extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    userObject: {},
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .get()
      .then((doc) => {
        this.setState({ userObject: doc.data() });
      });
  }

  startWorkout() {
    Alert.alert("Workout Started");
    this._subscribe();
  }

  sendToFirestore() {
    Alert.alert("Workout Stopped");
    this._unsubscribe();

    const coins =
      stepsToCoins(this.state.currentStepCount) + this.state.userObject.coins;
    const newUserObject = this.state.userObject;
    newUserObject.coins = coins;

    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .set(newUserObject)
      .then(() => {
        this.setState({
          currentStepCount: 0,
          userObject: newUserObject,
        });
      });
  }
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount((result) => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      (error) => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        this.setState({ pastStepCount: result.steps });
      },
      (error) => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Your Coins</Text>
          <Text>{this.state.userObject.coins}</Text>
        </View>
        <View>
          <Text style={styles.title}>Press to start step count</Text>
          <Button title="Start" onPress={() => this.startWorkout()} />
          <Separator />
        </View>
        {/* <Text>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text>
        <Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text> */}
        <Text>{this.state.currentStepCount}</Text>
        <Separator />
        <View>
          <Text style={styles.title}>Press to stop step count</Text>
          <Button title="Stop" onPress={() => this.sendToFirestore()} />
        </View>
      </View>
    );
  }
}

const stepsToCoins = (steps) => {
  return steps / 10;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
