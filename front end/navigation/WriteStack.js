import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import AllWritingsScreen from "../screens/application/AllWritingsScreen";
import WritingDetailScreen from "../screens/application/WritingDetailScreen";
import NewWritingScreen from "../screens/application/NewWritingScreen";
import EditWritingScreen from "../screens/application/EditWritingScreen";
import WritingAnalysisScreen from "../screens/application/WritingAnalysisScreen";

const Stack = createStackNavigator();

const WriteStack = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="AllWritings">
            <Stack.Screen name="AllWritings" component={AllWritingsScreen}/>
            <Stack.Screen name="WritingDetail" component={WritingDetailScreen}/>
            <Stack.Screen name="NewWriting" component={NewWritingScreen}/>
            <Stack.Screen name="EditWriting" component={EditWritingScreen}/>
            <Stack.Screen name="WritingAnalysis" component={WritingAnalysisScreen}/>
        </Stack.Navigator>
    )
}

export default WriteStack;