import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';

import WriteStack from "./WriteStack";
import ProfileStack from "./ProfileStack";

import HomeScreen from "../screens/application/HomeScreen";

import colors from "../constants/colors";

const Tabs = createBottomTabNavigator();

const ApplicationTabs = () => { 
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === "Home") {
            icon = <FontAwesome name="home" size={24} color={color} />

          } else if (route.name === "Write") {
            icon = <FontAwesome name="pencil" size={24} color={color} />
          }
          else if (route.name === "Profile") {
            icon = <FontAwesome name="user-o" size={24} color={color} />
          }
          return icon;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.darkGrey,
        showLabel: true,
        keyboardHidesTabBar: true
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Write" component={WriteStack} />
      <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>
  );
};

export default ApplicationTabs;
