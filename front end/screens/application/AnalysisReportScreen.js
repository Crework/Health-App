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
  Dimensions
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import env from '../../env';
import colors from "../../constants/colors";
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, _ } = Dimensions.get("window");

const AnalysisReportScreen = ({ navigation }) => {

  const [fileName, setFileName] = useState('');
  const journals = useSelector(state => state.journals);
  const [wordCloudGenerated, setWordCloudGenerated] = useState(false);

  const getWordsFromJournal = () => {
    const end = journals.length>7 ? 8 : (journals.length);
    return journals.slice(-1,end).map(journal => journal.content).join(' ');
  } 

  const onWordCloudPressed = async () =>{
    setWordCloudShown(true);
    const name = await AsyncStorage.getItem('userName');
    setFileName(name);
    const data = getWordsFromJournal();
    console.log(data,name);
    await fetch(`${env.url}/api/journals/create-word-cloud`, {
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({content:data, fileName:name})
    });
    setWordCloudGenerated(true);
  }

  const [wordCloudShown, setWordCloudShown] = useState(false);
  const [chartAreaWidth, setChartAreaWidth] = useState(0);
  const [chartAreaHeight, setChartAreaHeight] = useState(0);
  const [moodsData, _] = useState([
    { date: "1", mood: 0 },
    { date: "2", mood: 1 },
    { date: "3", mood: -1 },
    { date: "4", mood: 0 },
    { date: "5", mood: 0 },
    { date: "6", mood: 1 },
    { date: "7", mood: 0 },
    { date: "8", mood: -1 },
    { date: "9", mood: -1 },
    { date: "10", mood: 1 },
    { date: "11", mood: 1 },
    { date: "12", mood: 1 },
    { date: "13", mood: 0 },
    { date: "14", mood: -1 },
    { date: "15", mood: 1 },
    { date: "16", mood: 0 },
    { date: "17", mood: 1 },
    { date: "18", mood: -1 },
    { date: "19", mood: 1 },
    { date: "20", mood: 0 },
    { date: "21", mood: 1 },
  ]);

  const mappingMoodsToDates = (moodArray) => {
    let moodObject = {};
    for (let i = 0; i < moodArray.length; i++) {
      moodObject[`2021-02-${moodArray[i].date}`] = {
        customStyles: {
          container: {
            backgroundColor:
              moodArray[i].mood > 0
                ? colors.happyColor
                : moodArray[i].mood < 0
                ? colors.sadColor
                : "transparent",
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 8,
            borderTopRightRadius: 4,
            borderTopLeftRadius: 8,
            elevation: .5
          },
          text: {
            color: moodArray[i].mood === 0 ? colors.black : colors.white,
          },
        },
      };
    }
    return moodObject;
  };

  const [activeWeek, setActiveWeek] = useState({
    activeDates: [...moodsData]
      .reverse()
      .slice(0, 7)
      .map((data) => data.date)
      .reverse(),
    activeMoods: [...moodsData]
      .reverse()
      .slice(0, 7)
      .map((data) => data.mood)
      .reverse(),
  });

  const shiftToAnotherWeek = (start, end) => {
    if (start >= 0 && start < moodsData.length) {
      const activeDates = moodsData
        .map((moodData) => moodData.date)
        .slice(start, end);
      const activeMoods = moodsData
        .map((moodData) => moodData.mood)
        .slice(start, end);
      setActiveWeek({
        activeMoods,
        activeDates,
      });
    } else {
      return;
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.analysisHeader}>
        <Text style={styles.analysisText}>Mood Analysis</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.analysisCard}>
          <View style={styles.analysisCardHeader}>
            <Text
              style={{ fontFamily: "Bold", letterSpacing: 0.8, fontSize: 14 }}
            >
              Monthly Overview
            </Text>
          </View>
          <View
            style={[
              styles.analysisCardContent,
              { paddingVertical: 12, borderRadius: 10, height: 350 , },
            ]}
          >
            <Calendar
              monthFormat={"MMMM, yyyy"}
              hideExtraDays={true}
              disableMonthChange={true}
              firstDay={1}
              renderArrow={(direction) => (
                <FontAwesome
                  name={
                    direction === "left"
                      ? "long-arrow-left"
                      : "long-arrow-right"
                  }
                  size={18}
                  color={colors.black}
                />
              )}
              disableAllTouchEventsForDisabledDays={true}
              enableSwipeMonths={true}
              markingType={"custom"}
              markedDates={mappingMoodsToDates(moodsData)}
            />
          </View>
        </View>
        <View style={styles.analysisCard}>
          <View style={styles.analysisCardHeader}>
            <Text
              style={{ fontFamily: "Bold", letterSpacing: 0.8, fontSize: 14 }}
            >
              Weekly Overview
            </Text>
          </View>
          <View style={styles.weekControls}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                shiftToAnotherWeek(
                  parseInt(activeWeek.activeDates[0]) - 8,
                  parseInt(activeWeek.activeDates[0]) - 1
                );
              }}
              style={styles.weekControl}
            >
              <Text
                style={{
                  fontFamily: "Medium",
                  letterSpacing: 0.2,
                  fontSize: 12,
                }}
              >
                Prev. Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                shiftToAnotherWeek(
                  parseInt(
                    activeWeek.activeDates[activeWeek.activeDates.length - 1]
                  ),
                  parseInt(
                    activeWeek.activeDates[activeWeek.activeDates.length - 1]
                  ) + 7
                );
              }}
              style={styles.weekControl}
            >
              <Text
                style={{
                  fontFamily: "Medium",
                  letterSpacing: 0.2,
                  fontSize: 12,
                }}
              >
                Next Week
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.gradientContainer}
          >
            <View style={styles.moodXLabel}>
              <Text
                style={{
                  fontFamily: "Medium",
                  letterSpacing: 2,
                  fontSize: 13,
                  color: colors.white,
                }}
              >
                Days
              </Text>
            </View>
            <View
              style={styles.analysisCardContent}
              onLayout={({
                nativeEvent: {
                  layout: { width, height },
                },
              }) => {
                setChartAreaWidth(width);
                setChartAreaHeight(height);
              }}
            >
              <View>
                <LineChart
                  data={{
                    labels: activeWeek.activeDates,
                    datasets: [
                      {
                        data: activeWeek.activeMoods,
                      },
                    ],
                  }}
                  width={chartAreaWidth}
                  height={220}
                  fromNumber={-1}
                  getDotColor={(dataPoint) => {
                    let color =
                      dataPoint > 0
                        ? colors.happyColor
                        : dataPoint < 0
                        ? colors.sadColor
                        : colors.white;
                    return color;
                  }}
                  segments={2}
                  formatYLabel={(yLabel) => Math.ceil(yLabel) === 1 ? "Happy" : Math.ceil(yLabel) === -1 ? "Sad" : "Neutral"}
                  yLabelsOffset={12}
                  transparent={true}
                  chartConfig={{
                    backgroundColor: colors.moreBlurredPrimary,
                    backgroundGradientFrom: colors.moreBlurredPrimary,
                    backgroundGradientTo: colors.blurredSecondary,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "white",
                    },
                  }}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        
        <TouchableOpacity
          activeOpacity={1}
          style={styles.wordCloudCard}
          onPress={() => {
            setWordCloudShown(false);
          }}
        >
          <View style={styles.row}>
            <MaterialIcons
              name="amp-stories"
              color={colors.darkGrey}
              size={20}
              style={{ marginRight: 8 }}
            />

            <View style={styles.rowInfo}>
              <Text
                style={{
                  fontFamily: "Medium",
                  color: colors.lightBlack,
                  letterSpacing: 0.4,
                }}
              >
                Word Cloud
              </Text>
              <MaterialIcons
                name={
                  wordCloudShown ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                color={colors.lightBlack}
                size={20}
                style={{ marginRight: 8 }}
              />
            </View>
          </View>
          <View style={styles.wordCloudPrompt}>
            <Text
              style={{
                fontFamily: "Regular",
                color: colors.darkGrey,
                fontSize: 13,
                letterSpacing: 0.4,
                lineHeight: 16,
                marginBottom: 8,
              }}
            >
              World Cloud will generate a PNG/JPG Image consisting the most used
              words in your journal. You can create multiple word clouds by
              editing your text and regenerating.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onWordCloudPressed();
              }}
              style={styles.tryButtonContainer}
            >
              <Text
                style={{
                  fontFamily: "Medium",
                  color: colors.white,
                  fontSize: 16,
                  letterSpacing: 1,
                }}
              >
                Try Now
              </Text>
            </TouchableOpacity>
          </View>
          
          {wordCloudShown && <View style={styles.wordCloud}>
                {wordCloudGenerated && <Image source = {{uri: `${env.url}/image/data/${fileName}.png`}}
                        style = {styles.wordCloudImage}
                        width = {width-48}
                        height = {200}
                />}
          </View>}
        </TouchableOpacity>



        <View style={styles.analysisCard}>
          <View style={[styles.analysisCardHeader, {marginVertical: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0}]}>
            <Text
              style={{ fontFamily: "Bold", letterSpacing: 0.8, fontSize: 14 }}
            >
              Talk to Professionals
            </Text>
          </View>
          <View style={[styles.analysisCardContent, { backgroundColor: colors.differentGreyBackground, paddingBottom: 20, borderBottomRightRadius: 12, borderBottomLeftRadius: 12}]}>
            <TouchableOpacity activeOpacity={1} style={styles.doctorCard}>
              <Text style={styles.doctorName}>Dr. Nainika</Text>
              <Text style={styles.doctorContact}>Contact: 9876543210</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.doctorCard}>
              <Text style={styles.doctorName}>Dr. Sheetal</Text>
              <Text style={styles.doctorContact}>Contact: 9876543210</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.doctorCard}>
              <Text style={styles.doctorName}>Dr. Riya</Text>
              <Text style={styles.doctorContact}>Contact: 9876543210</Text>
            </TouchableOpacity>
          </View>
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
  analysisHeader: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  analysisText: {
    fontSize: 22,
    fontFamily: "Bold",
    letterSpacing: 0.2,
  },
  analysisCard: {
    width: "100%",
    marginVertical: 12,
  },
  wordCloudCard: {
    width: "100%",
    backgroundColor: colors.differentGreyBackground,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 12
  },
  analysisCardHeader: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: colors.differentGreyBackground,
    marginVertical: 8,
    borderRadius: 12,
  },
  analysisCardContent: {
    width: "100%",
  },
  weekControls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  weekControl: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.blurredPrimary,
    borderRadius: 6,
  },
  gradientContainer: {
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 4,
    position: "relative",
  },
  moodXLabel: {
    position: "absolute",
    left: "50%",
    bottom: 10,
  },
  doctorCard: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingBottom: 2,
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 0.3,
  },
  doctorName: {
    fontSize: 14,
    fontFamily: "Medium",
    letterSpacing: 0.4,
    color: colors.black,
  },
  doctorContact: {
    fontSize: 12,
    fontFamily: "Medium",
    letterSpacing: 0.4,
    color: colors.darkGrey,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  rowInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wordCloudPrompt: {
    padding: 8,
    width: "100%",
    alignItems: "center",
  },
  tryButtonContainer: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    width: "30%",
    alignItems: "center",
  },
  wordCloud: {
    justifyContent:"center",
    alignItems:"center",
    marginTop: 12,
    width: "100%",
    borderRadius: 4,
  },
  wordCloudImage: {
    borderRadius:12,
    width:width-48,
    height:200,
    resizeMode: "contain"
  },
});

export default AnalysisReportScreen;
