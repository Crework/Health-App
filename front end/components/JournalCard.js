import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const JournalCard = ({ journal, navigation }) => {

  const day = new Date(journal.createdAt).getDay();
  const month = new Date(journal.createdAt).getMonth();
  const year = new Date(journal.createdAt).getFullYear();
  const date = new Date(journal.createdAt).getDate();
  const hours = new Date(journal.createdAt).getHours();
  const minutes = new Date(journal.createdAt).getMinutes();

  const daysOfTheWeek = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", 'September', 'October', 'November', 'December'];
  console.log("here");

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.journalCardContainer} onPress={() => navigation.navigate("WritingDetail", {"id" : journal._id})}>
      <View style={styles.journalCard}>
        <View style={styles.journalHead}>
          <Text style={styles.day}>{daysOfTheWeek[day].slice(0, 3)}</Text>
          <Text style={styles.date}>
            {date}
          </Text>
          <Text style={styles.month}>{monthsOfTheYear[month].slice(0,3)}</Text>
        </View>
        <View style={styles.journalContent}>
          <Text style={styles.content} numberOfLines={4}>
            {journal.content}
          </Text>
        </View>
      </View>
      <View style={styles.timeStamp}>
        <Text style={styles.timeText}>{hours}:{minutes}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JournalCard;

const styles = StyleSheet.create({
  journalCardContainer: {
    width: width - 32,
    borderRadius: 6,
    marginVertical: 8,
    backgroundColor: colors.moreBlurredPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  journalCard: {
    width: "100%",
    flexDirection: "row",
  },
  journalHead: {
    width: "20%",
    justifyContent: "center",
  },
  day: {
    color: colors.darkGrey,
    letterSpacing: 0.75,
    fontSize: 16,
    fontFamily: "Bold",
  },
  date: {
    color: colors.primary,
    letterSpacing: 0.75,
    fontSize: 32,
    fontFamily: "Bold",
  },
  month: {
    color: colors.darkGrey,
    letterSpacing: 0.75,
    fontSize: 16,
    fontFamily: "Bold",
  },
  journalContent: {
    flex: 1,
  },
  content: {
    width: "100%",
    letterSpacing: 0.25,
    fontFamily: "Regular",
    color: colors.lightBlack,
    lineHeight: 22,
    fontSize: 14,
  },
  timeStamp: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginVertical: 4
  },
  timeText: {
      fontFamily: "Regular",
      color: colors.darkGrey,
      fontSize: 12,
      letterSpacing: 1
  }
});
