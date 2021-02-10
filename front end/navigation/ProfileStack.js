import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import UserProfileScreen from "../screens/application/UserProfileScreen";
import ProfileSettingsScreen from "../screens/application/ProfileSettingsScreen";
import AnalysisReportScreen from "../screens/application/AnalysisReportScreen";
import ApplicationInfoScreen from "../screens/application/ApplicationInfoScreen";
import PrivacyPolicyScreen from "../screens/application/PrivacyPolicyScreen";
import HelpAndSupportScreen from "../screens/application/HelpAndSupportScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="UserProfile">
            <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen}/>
            <Stack.Screen name="AnalysisReport" component={AnalysisReportScreen}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen}/>
            <Stack.Screen name="ApplicationInfo" component={ApplicationInfoScreen}/>
            <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen}/>
        </Stack.Navigator>
    )
}

export default ProfileStack;
