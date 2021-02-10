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
  Keyboard,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const { width, height } = Dimensions.get("window");

const WritingDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.writingHeader}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backLogo}
        />
        <View style={styles.actionButtonsContainer}>
        <MaterialIcons
          onPress={() => navigation.navigate("EditWriting")}
          name="edit"
          size={24}
          color="black"
          style={styles.editLogo}
        />
         <Ionicons
          onPress={() => navigation.navigate("WritingAnalysis")}
          name="analytics-outline"
          size={28}
          color="black"
          style={styles.analysisLogo}
        />
        </View>
      </View>
      <View style={styles.writingInfo}>
        <View style={styles.dateInfo}>
          <View style={styles.date}>
            <View style={styles.row}>
              <Text style={styles.dateText}>14</Text>
              <Text style={styles.monthText}>February</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.yearText}>2021,</Text>
              <Text style={styles.dayText}>Sunday</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={colors.darkGrey}
              style={styles.calendarLogo}
            />
          </View>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>11:11 AM</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name="time"
              size={16}
              color={colors.darkGrey}
              style={styles.clockLogo}
            />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.writing}>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
          <Text
            style={{
              height: 200,
              width: "100%",
              backgroundColor: colors.differentGreyBackground,
            }}
          >
            User's Journal Here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: width,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
  writingHeader: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  writingInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  dateInfo: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    marginHorizontal: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginHorizontal: 2,
    fontFamily: "Bold",
    color: colors.primary,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  dayText: {
    marginHorizontal: 2,
    fontFamily: "Medium",
    color: colors.darkGrey,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  monthText: {
    marginHorizontal: 2,
    fontFamily: "Bold",
    textTransform: "uppercase",
    color: colors.lightBlack,
    fontSize: 18,
    letterSpacing: 0.5,
  },
  yearText: {
    marginHorizontal: 2,
    fontFamily: "Medium",
    color: colors.darkGrey,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.differentGreyBackground,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  timeInfo: {
    justifyContent: "center",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  timeText: {
    marginHorizontal: 2,
    fontFamily: "Bold",
    textTransform: "uppercase",
    color: colors.lightBlack,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  writing: {
    maxWidth: "100%",
    borderTopColor: colors.differentGreyBackground,
    borderTopWidth: 1,
    borderRadius: 4
  },
  input: {
    padding: 8,
    paddingVertical: 16,
    fontFamily: "Regular",
    fontSize: 16,
  },
  actionButtonsContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      right: 0
  },
  editLogo: {
      marginRight: 20
  },
});

export default WritingDetailScreen;
