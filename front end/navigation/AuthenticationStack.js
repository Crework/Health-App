import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginStack from "./LoginStack";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import WelcomeScreen from "../screens/authentication/WelcomeScreen";

const Stack = createStackNavigator();

const AuthenticationStack = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Login">
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Login" component={LoginStack}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

export default AuthenticationStack;
