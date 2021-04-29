import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { default as BookShop } from "../BookShop/BookShop";
import { default as CoinBankScreen } from "../CoinBankScreen/CoinBankScreen";
import { default as UserScreen } from "../UserScreen/UserScreen";
import { default as ChatMessengerScreen } from "../ChatMessengerScreen/ChatMessengerScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBook,
  faEnvelope,
  faCoins,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  let userObject = {};
  if (props.user) {
    userObject = props.user;
  } else {
    userObject = props.route.params;
  }

  return (
    <Tab.Navigator
      initialRouteName={"BookShop"}
      screenOptions={({ route }) => {
        if (route.name === "BookShop") {
          return {
            tabBarIcon: () => {
              return (
                <FontAwesomeIcon icon={faBook} color="#389f70" size={23} />
              );
            },
          };
        } else if (route.name === "Messages") {
          return {
            tabBarIcon: () => {
              return (
                <FontAwesomeIcon icon={faEnvelope} color="#389f70" size={23} />
              );
            },
          };
        } else if (route.name === "CoinBank") {
          return {
            tabBarIcon: () => {
              return (
                <FontAwesomeIcon icon={faCoins} color="#389f70" size={23} />
              );
            },
          };
        } else {
          return {
            tabBarIcon: () => {
              return (
                <FontAwesomeIcon icon={faUser} color="#389f70" size={23} />
              );
            },
          };
        }
      }}
    >
      <Tab.Screen name="UserProfile">
        {(props) => <UserScreen {...props} user={userObject} />}
      </Tab.Screen>
      <Tab.Screen name="BookShop">
        {(props) => <BookShop {...props} user={userObject} />}
      </Tab.Screen>
      <Tab.Screen name="Messages">
        {(props) => <ChatMessengerScreen {...props} user={userObject} />}
      </Tab.Screen>
      <Tab.Screen name="CoinBank">
        {(props) => <CoinBankScreen {...props} user={userObject} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
