import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { firebase } from "../../firebase/config";

const Separator = () => <View style={styles.separator} />;

export default class PedometerScreen extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    pastCoins: {
      coins: 0,
    },
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("coins")
      .doc("coins")
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ pastCoins: doc.data() });
        }
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
      stepsToCoins(this.state.currentStepCount) + this.state.pastCoins.coins;

    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.id)
      .collection("coins")
      .doc("coins")
      .set({
        coins: coins,
      })
      .then(() => {
        this.setState({
          currentStepCount: 0,
          pastCoins: {
            coins: coins,
          },
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
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Your Coins</Text>
          <Text>{this.state.pastCoins.coins}</Text>
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
  return steps / 100;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
