import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import UserProfileScreen from "../screens/application/UserProfileScreen";
import ProfileSettingsScreen from "../screens/application/ProfileSettingsScreen";
import AnalysisReportScreen from "../screens/application/AnalysisReportScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="UserProfile">
            <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen}/>
            <Stack.Screen name="AnalysisReport" component={AnalysisReportScreen}/>
        </Stack.Navigator>
    )
}

export default ProfileStack;
