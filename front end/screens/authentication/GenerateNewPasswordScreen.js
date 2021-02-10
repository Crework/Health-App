import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const GenerateNewPasswordScreen = ({ navigation }) => {
  let passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  useEffect(() => {
    passwordRef?.focus();
  }, []);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
      <View style={styles.newPasswordHeader}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backLogo}
        />
        <Text style={styles.newPasswordText}>Reset Password</Text>
      </View>
      <KeyboardAvoidingView style={styles.newPasswordForm} behavior="padding" keyboardShouldPersistTaps="always">
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
          <Text style={styles.inputLabel}>NEW PASSWORD</Text>
          <View style={[styles.input, styles.specialInput]}>
            <TextInput style={{flex: 1, padding: 0, fontFamily: "Regular"}} ref={(password) => passwordRef = password} secureTextEntry={!showPassword}/>
            {showPassword ? (
              <Ionicons
                name="eye-off"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowPassword(!showPassword)}
                style={{marginRight: 4}}
              />
            ) : (
              <Ionicons
                name="eye"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowPassword(!showPassword)}
                style={{marginRight: 4}}
              />
            )}
          </View>
          <Text style={styles.inputLabel}>CONFIRM NEW PASSWORD</Text>
          <View style={[styles.input, styles.specialInput]}>
            <TextInput style={{flex: 1, padding: 0, fontFamily: "Regular"}} secureTextEntry={!showConfirmedPassword}/>
            {showConfirmedPassword ? (
              <Ionicons
                name="eye-off"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
                style={{marginRight: 4}}
              />
            ) : (
              <Ionicons
                name="eye"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
                style={{marginRight: 4}}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.saveButtonContainer}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
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
  newPasswordHeader: {
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
  newPasswordText: {
    fontSize: 22,
    fontFamily: "Bold",
    letterSpacing: 0.2,
  },
  newPasswordForm: {
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: "Regular",
    letterSpacing: 0.5,
    fontSize: 12,
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    backgroundColor: colors.differentGreyBackground,
    padding: 8,
    borderRadius: 12,
    marginBottom: 10,
    fontFamily: "Regular",
  },
  specialInput: {
    flexDirection: "row",
    alignItems: "center"
  },
  saveButtonContainer: {
    width: "40%",
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  saveButton: {
    fontFamily: "Bold",
    fontSize: 18,
    letterSpacing: 0.6,
    color: colors.white,
  },
});

export default GenerateNewPasswordScreen;
