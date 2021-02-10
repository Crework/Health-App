import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import  * as firebase  from "firebase";

import { ActivityIndicator, View } from "react-native";
import AuthenticationStack from "./navigation/AuthenticationStack";
import ApplicationTabs from "./navigation/ApplicationTabs";
import { firebaseConfig } from "./firebaseConfig";
// import mongoConnect from "./util/database";


const Stack = createStackNavigator();
// const app = express();

const loadFonts = () => {
  return Font.loadAsync({
    Thin: require("./assets/fonts/Inter-Thin.ttf"),
    Light: require("./assets/fonts/Inter-Light.ttf"),
    Regular: require("./assets/fonts/Inter-Regular.ttf"),
    Medium: require("./assets/fonts/Inter-Medium.ttf"),
    Bold: require("./assets/fonts/Inter-Bold.ttf"),
    Black: require("./assets/fonts/Inter-Black.ttf"),
    Logo: require("./assets/fonts/PottaOne-Regular.ttf"),
    Name:require("./assets/fonts/YuseiMagic-Regular.ttf"),
    Quote:require("./assets/fonts/Pacifico-Regular.ttf")
  });
};


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loggedIn, setLoggedInState] = useState(null);

  const checkIfLoggedIn = () =>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log(user);
        setLoggedInState(true);
      }
      else{
        setLoggedInState(false);
      }
    })
  }

  useEffect(() =>{
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    checkIfLoggedIn()
    // mongoConnect(client => {
    //   console.log(client);
    //   // app.listen(3000, ()=>{
    //   //   console.log("Listening on port 3000")
    //   // });
    // })

  })

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => {console.log("loaded successfully"); setFontsLoaded(true)}}
        onError={(err) => console.log(err)}
      />
    );
  }

  if(loggedIn==null) return <AppLoading/>

  console.log(loggedIn)

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={ loggedIn==false ? "AuthenticationStack": "ApplicationTabs"}>
        <Stack.Screen
          name="AuthenticationStack"
          component={AuthenticationStack}
        />
        <Stack.Screen 
          name="ApplicationTabs" 
          component={ApplicationTabs} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}