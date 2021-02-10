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
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const ResetPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.resetHeader}>
        <Ionicons
          onPress={
            () => navigation.goBack()
          }
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backLogo}
        />
        <Text style={styles.resetText}>Reset Password</Text>
      </View>
      <View style={styles.resetForm}>
        <Text style={styles.inputLabel} numberOfLines={2}>
          Enter your e-mail to get the One Time Password (OTP)
        </Text>
        <TextInput style={styles.input} autoFocus/>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.sendButtonContainer}
        onPress={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            navigation.replace("EnterOTP");
          }, 200)
        }}
      >
        <Text style={styles.sendButton}>Send OTP</Text>
      </TouchableOpacity>
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
    marginTop: 24,
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
  resetForm: {
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputLabel: {
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Medium",
    lineHeight: 20,
    color: colors.darkGrey,
  },
  input: {
    width: "100%",
    backgroundColor: colors.differentGreyBackground,
    padding: 8,
    borderRadius: 12,
    marginBottom: 10,
    fontFamily: "Regular",
  },
  sendButtonContainer: {
    width: "40%",
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  sendButton: {
    fontFamily: "Bold",
    fontSize: 18,
    letterSpacing: 0.6,
    color: colors.white,
  },
});

export default ResetPasswordScreen;
