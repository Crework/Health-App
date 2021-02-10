import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from "../screens/authentication/LoginScreen";
import ResetPasswordScreen from "../screens/authentication/ResetPasswordScreen";
import GenerateNewPasswordScreen from "../screens/authentication/GenerateNewPasswordScreen";
import OTPScreen from "../screens/authentication/OTPScreen";

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            <Stack.Screen name="EnterOTP" component={OTPScreen}/>
            <Stack.Screen name="GenerateNewPassword" component={GenerateNewPasswordScreen}/>
        </Stack.Navigator>
    )
}

export default LoginStack;