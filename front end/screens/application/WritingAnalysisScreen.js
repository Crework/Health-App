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
import { PieChart } from "react-native-chart-kit";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";

const { width, _ } = Dimensions.get("window");

const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const WritingAnalysisScreen = ({ navigation, route }) => {

  const {content, dateInfo} = route.params;
  const [emotionsData, setEmotionsData] = useState([
    {
      name: "Happy",
      emotionQuotient: null,
      color: colors.happyColor,
    },
    {
      name: "Sad",
      emotionQuotient: null,
      color: colors.sadColor,
    }]
  );

  useEffect(()=>{
    setEmotionsData([{...emotionsData[0],"emotionQuotient":content.moodResult.happy},
                    {...emotionsData[1],"emotionQuotient":1-content.moodResult.happy}
                  ])
    
  }, [])

  const [chartAreaWidth, setChartAreaWidth] = useState(0);
  const [chartAreaHeight, setChartAreaHeight] = useState(0);
  return (
    <View style={styles.screen}>
      <View style={styles.analysisHeader}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backLogo}
        />
        <Text style={styles.analysisText}>Writing Results</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.writingInfo}>
          <View style={styles.dateInfo}>
            <View style={styles.date}>
              <View style={styles.row}>
                <Text style={styles.dateText}>{dateInfo.date}</Text>
                <Text style={styles.monthText}>{dateInfo.month}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.yearText}>{dateInfo.year},</Text>
                <Text style={styles.dayText}>{dateInfo.day}</Text>
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


        <View style={styles.analysisCard}>
          <View style={styles.row}>
            <MaterialIcons
              name="text-snippet"
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
                Sentences you wrote
              </Text>
              <Text
                style={{
                  fontFamily: "Medium",
                  color: colors.lightBlack,
                  letterSpacing: 0.4,
                  marginRight: 8,
                }}
              >
                {content.content.split('.').length}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={1} style={styles.analysisCard}>
          <View style={styles.row}>
            <Ionicons
              name="analytics-outline"
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
                Mood Analysis
              </Text>
            </View>
          </View>
          <View
            style={styles.moodAnalysis}
            onLayout={({
              nativeEvent: {
                layout: { width, height },
              },
            }) => {
              setChartAreaWidth(width);
              setChartAreaHeight(height);
            }}
          >
            <PieChart
              data={emotionsData}
              width={chartAreaWidth}
              height={chartAreaHeight}
              chartConfig={chartConfig}
              accessor={"emotionQuotient"}
              paddingLeft={`${chartAreaWidth / 5 + 10}`}
              center={[0, 0]}
              hasLegend={false}
            />
          </View>
          <View style={styles.analysisInfo}>
            <View style={styles.legendsContainer}>
              <View style={styles.legend}>
                <View
                  style={[
                    styles.legendIndicator,
                    { backgroundColor: colors.happyColor },
                  ]}
                />
                <Text style={styles.legendText}>
                  {(
                    (emotionsData[0]["emotionQuotient"] /
                      (emotionsData[0]["emotionQuotient"] +
                        emotionsData[1]["emotionQuotient"])) *
                    100
                  ).toFixed(1)}{" "}
                  % Happy
                </Text>
              </View>
              <View style={styles.legend}>
                <View
                  style={[
                    styles.legendIndicator,
                    { backgroundColor: colors.sadColor },
                  ]}
                />
                <Text style={styles.legendText}>
                  {(
                    (emotionsData[1]["emotionQuotient"] /
                      (emotionsData[0]["emotionQuotient"] +
                        emotionsData[1]["emotionQuotient"])) *
                    100
                  ).toFixed(1)}{" "}
                  % Sad
                </Text>
              </View>
            </View>
            <View style={styles.overallMood}>
              <Text style={styles.moodText}>Mood: <Text style={styles.mood}>Happy</Text></Text>
            </View>
          </View>
        </TouchableOpacity>
        
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
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  backLogo: {
    position: "absolute",
    left: 0,
  },
  analysisText: {
    fontSize: 22,
    fontFamily: "Bold",
    letterSpacing: 0.2,
  },
  writingInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 16,
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
  analysisCard: {
    width: "100%",
    backgroundColor: colors.differentGreyBackground,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 12,
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
    marginTop: 12,
    height: 200,
    width: "100%",
    backgroundColor: colors.blurredSecondary,
    borderRadius: 4,
  },
  moodAnalysis: {
    height: 250,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  legendsContainer: {
    width: "100%",
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendIndicator: {
    width: 20,
    height: 20,
    borderRadius: 8,
    backgroundColor: "red",
    marginRight: 10,
  },
  legendText: {
    fontFamily: "Medium",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  overallMood: {
    width: "100%",
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  moodText: {
    fontFamily: "Medium",
    letterSpacing: 0.4,
    fontSize: 14
  },
  mood: {
    fontFamily: "Bold",
    letterSpacing: 0.4,
    fontSize: 18,
    color: colors.happyColor
  }
});

export default WritingAnalysisScreen;
