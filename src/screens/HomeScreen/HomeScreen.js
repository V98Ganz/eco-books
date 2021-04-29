import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { default as BookShop } from "../BookShop/BookShop";
import { default as CoinBankScreen } from "../CoinBankScreen/CoinBankScreen";
import { default as UserScreen } from "../UserScreen/UserScreen";
import { default as ChatMessengerScreen } from "../ChatMessengerScreen/ChatMessengerScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  let userObject = {};
  if (props.user) {
    userObject = props.user;
  } else {
    userObject = props.route.params;
  }

  return (
    <Tab.Navigator initialRouteName={"BookShop"}>
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
