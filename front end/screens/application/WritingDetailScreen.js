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
  ActivityIndicator
} from "react-native";
import Constants from 'expo-constants';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const { width, height } = Dimensions.get("window");

const WritingDetailScreen = ({ navigation, route }) => {

  const daysOfTheWeek = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", 'September', 'October', 'November', 'December'];
  const [loading, setLoading] = useState(true);

  const {id} = route.params;
  const [content, setContent] = useState('');
  const [dateInfo, setDateInfo] = useState({
    date:'',
    day:'',
    month: '',
    year: '',
    hour: {
      suffix: '',
      hours: ''
    },
    minute: ''
  });

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
      'hours': hours.toString()
    }
  }


  useEffect( () =>{
    const fetchJournalDetails = async() => {
      const response = await fetch(`${Constants.manifest.extra.URL}/api/journals/${id}/get-one`);
      const data = await response.json();
      setContent(data.foundJournal);
      setDateInfo({
        date: new Date(data.foundJournal.createdAt).getDate(),
        day:daysOfTheWeek[new Date(data.foundJournal.createdAt).getDay()],
        month: monthsOfTheYear[new Date(data.foundJournal.createdAt).getMonth()],
        year: new Date(data.foundJournal.createdAt).getFullYear(),
        hour: convertTime(new Date(data.foundJournal.createdAt).getHours()),
        minute: new Date(data.foundJournal.createdAt).getMinutes().toString()
      });
      setLoading(false);
    }
    fetchJournalDetails();
  }, []);


  return (
    <View style= {{flex:1}}>
      {!loading ? <View style={styles.screen}>
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
          onPress={() => navigation.navigate("EditWriting", {"journal" : content})}
          name="edit"
          size={24}
          color="black"
          style={styles.editLogo}
        />
         <Ionicons
          onPress={() => navigation.navigate("WritingAnalysis", {content, dateInfo})}
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
              <Text style={styles.dateText}>
                {dateInfo.date}
              </Text>
              <Text style={styles.monthText}>
                {dateInfo.month}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.yearText}>
                {new Date(content.createdAt).getFullYear()},
              </Text>
              <Text style={styles.dayText}>
                {dateInfo.day}
              </Text>
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
          <Text style={styles.timeText}>
            {dateInfo.hour.hours.length==1 ? `0${dateInfo.hour.hours}` : dateInfo.hour.hours}:{ dateInfo.minute.length==1 ? `0${dateInfo.minute}` : dateInfo.minute} {dateInfo.hour.suffix}
          </Text>
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
            }}
          >
            {content.content}
          </Text>
        </View>
      </ScrollView>
    </View> :
    <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
      <ActivityIndicator size = {'large'} color = {colors.primary} />
    </View>
    
  }
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
