import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
} from "react-native";
import firebase from 'firebase';
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import colors from "../../constants/colors";

const ProfileSettingsScreen = ({ navigation }) => {

  const onDeleteButtonPress = () => {
    const user = firebase.auth().currentUser;
    user.delete().then(function(){
      navigation.reset({
        index : 0,
        routes:[{
          name:'AuthenticationStack'
        }] 
      })
    }). catch( error =>{
      console.log(error);
    })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.resetHeader}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backLogo}
        />
        <Text style={styles.resetText}>Profile Settings</Text>
      </View>
      <ScrollView
        style={styles.moreOptions}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.moreOption}>
          <Text style={styles.labelText}>Email</Text>
          <Text style={styles.labelInfo}>johndoe00@gmail.com</Text>
        </View>
        <View style={styles.moreOption}>
          <Text style={styles.labelText}>Name</Text>
          <Text style={styles.labelInfo}>John Doe</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onDeleteButtonPress()}
          style={[
            styles.moreOption,
            { flexDirection: "column", backgroundColor: colors.secondary, marginTop: 16 },
          ]}
        >
          <Text style={styles.deleteButton}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
  resetHeader: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  backLogo: {
    position: "absolute",
    left: 0,
  },
  resetText: {
    fontSize: 22,
    fontFamily: "Bold",
    letterSpacing: 0.2,
  },
  moreOptions: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
  },
  moreOption: {
    backgroundColor: colors.differentGreyBackground,
    borderRadius: 40,
    flexDirection: "row",
    marginVertical: 4,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  labelText: {
    fontFamily: "Bold",
    letterSpacing: 0.5,
    fontSize: 14,
  },
  labelInfo: {
    color: colors.lightBlack,
    fontFamily: "Medium",
    fontSize: 13,
  },
  deleteButton: {
    alignSelf: "center",
    fontFamily: "Bold",
    fontSize: 16,
    color: colors.white
  },
});

export default ProfileSettingsScreen;
