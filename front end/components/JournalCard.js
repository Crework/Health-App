import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const JournalCard = ({ journal, navigation }) => {


  const convertTime = (hours) => {
    let suffix = 'AM'
    if(hours>=12){
      if(hours!=24)
        suffix = 'PM'
      if(hours!=12)
        hours = hours % 12;
    }
    return {
      suffix,
      hours: hours.toString()
    }
  }

  const day = new Date(journal.createdAt).getDay();
  const month = new Date(journal.createdAt).getMonth();
  const year = new Date(journal.createdAt).getFullYear();
  const date = new Date(journal.createdAt).getDate();
  const hour = convertTime(new Date(journal.createdAt).getHours());
  const minute = new Date(journal.createdAt).getMinutes().toString();

  const daysOfTheWeek = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", 'September', 'October', 'November', 'December'];

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
        <Text style={styles.timeText}>
          {hour.hours.length===1 ? `0${hour.hours}` : hour.hours}:{ minute.length==1 ? `0${minute}` : minute} {hour.suffix}
        </Text>
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
    marginLeft:-8,
    marginRight: 8,
    alignItems: 'center',
    width: "16%",
    justifyContent: "center",
  },
  day: {
    color: colors.darkGrey,
    letterSpacing: 0.75,
    fontSize: 14,
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
    fontSize: 18,
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
