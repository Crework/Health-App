import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const ProfileSettingsScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={{fontFamily: "Medium"}}>Profile Settings here...</Text>
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

export default ProfileSettingsScreen;
