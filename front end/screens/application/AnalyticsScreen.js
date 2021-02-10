import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const AnalyticsScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={{fontFamily: "Medium"}}>Analytics here...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AnalyticsScreen;
