import React, { useState, useEffect, useRef } from "react";
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

const OTPScreen = ({ navigation }) => {
  const timeInSeconds = 60;
  const OTPLength = 6;
  let textInputRef = useRef();
  const [OTPEntered, setOTPEntered] = useState("");
  const [OTPInterrupted, setOTPInterrupted] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(timeInSeconds);

  useEffect(() => {
    textInputRef?.current?.focus();
    Keyboard.addListener("keyboardDidHide", onKeyboardHide);

    return () => {
      Keyboard.removeListener("keyboardDidHide", onKeyboardHide);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTimer((timer) => timer - 1);
    }, 1000);

    if (countdownTimer === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdownTimer]);

  useEffect(() => {
    handleOTPInterrupt();
  }, [OTPInterrupted]);

  const onKeyboardHide = () => {
    setOTPInterrupted(true);
  };

  const handleOTPInterrupt = () => {
    if (OTPInterrupted) {
      textInputRef?.blur();
    } else {
      textInputRef?.focus();
    }
  };

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
        <Text style={styles.resetText}>Reset Password</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.OTPSection}
        keyboardShouldPersistTaps="always"
      >
        <Text
          style={[styles.inputLabel, { alignSelf: "center", fontSize: 16 }]}
        >
          Enter OTP
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            ref={(input) => textInputRef = input}
            style={{opacity: 0, color: "transparent", position: "absolute", left: "45%",}}
            value={OTPEntered}
            caretHidden={true}
            keyboardType="numeric"
            maxLength={OTPLength}
            onChangeText={(text) => setOTPEntered(text)}
            autoFocus={true}
            selectTextOnFocus={false}
            pointerEvents="none"
            returnKeyType="done"
            selectionColor="transparent"
          />
          <View style={styles.OTPInput}>
            {Array(OTPLength)
              .fill()
              .map((_, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.OTPSingleCell}
                    key={index}
                    onPress={() => {
                      setOTPInterrupted(false);
                    }}
                  >
                    <Text style={styles.OTPSingleCellText}>
                      {OTPEntered && OTPEntered.length > 0
                        ? OTPEntered[index]
                        : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        <View style={styles.otherActionButtonsContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={
              countdownTimer > 0
                ? () => {}
                : () => {
                    setCountdownTimer(timeInSeconds);
                  }
            }
          >
            <Text
              style={{
                fontFamily: countdownTimer > 0 ? "Medium" : "Bold",
                fontSize: 14,
                letterSpacing: 0.5,
                color: countdownTimer > 0 ? colors.darkGrey : colors.primary,
              }}
            >
              Resend OTP{countdownTimer > 0 ? `(${countdownTimer})` : null}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.replace("ResetPassword")}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 14,
                letterSpacing: 0.5,
                color: colors.primary,
              }}
            >
              Try different e-mail
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 16,
                letterSpacing: 0.5,
                color: colors.white,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.confirmButton}
            onPress={() => {
              setTimeout(() => {
                navigation.replace("GenerateNewPassword")
              }, 500);
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 16,
                letterSpacing: 0.5,
                color: colors.white,
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OTPScreen;

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
  inputLabel: {
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Medium",
    lineHeight: 20,
    color: colors.darkGrey,
  },
  OTPSection: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputBox: {
    width: "100%",
  },
  OTPInput: {
    width: "100%",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
  },
  OTPSingleCell: {
    alignItems: "center",
    backgroundColor: colors.blurredPrimary,
    width: 32,
    maxWidth: "16.66%",
    paddingVertical: 10,
    borderRadius: 4,
  },
  OTPSingleCellText: {
    fontFamily: "Bold",
    fontSize: 16,
    color: colors.primary,
  },
  otherActionButtonsContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    marginLeft: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
