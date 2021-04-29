import { Pedometer } from "expo-sensors";
import React from "react";
import {
  Alert,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";

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
      .onSnapshot((doc) => {
        this.setState({
          userObject: doc.data(),
        });
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
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              "https://images.unsplash.com/photo-1562046433-dd0db5baddcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
          }}
          style={styles.background_img}
        >
          <View style={styles.center_things}>
            <View style={styles.coincount_wrapper}>
              <Text style={styles.title_top}>Your Coins</Text>
              <Text style={styles.coin_amount}>
                {this.state.userObject.coins}
              </Text>
            </View>
          </View>
          <View style={styles.center_things}>
            <Text style={styles.title}>Press to start step count</Text>
            <TouchableOpacity
              style={styles.start_button}
              onPress={() => this.startWorkout()}
            >
              <Text style={styles.button_text}>Start</Text>
            </TouchableOpacity>
            <Separator />
          </View>
          <Text style={styles.currentStepCount}>
            {this.state.currentStepCount}
          </Text>
          <Separator />
          <View style={styles.center_things}>
            <Text style={styles.title}>Press to stop step count</Text>
            <TouchableOpacity
              style={styles.stop_button}
              title="Stop"
              onPress={() => this.sendToFirestore()}
            >
              <Text style={styles.button_text}>Stop</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const stepsToCoins = (steps) => {
  return steps / 10;
};
