import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import WelcomeCarousel from '../../components/WelcomeCarousel';
import colors from "../../constants/colors";
import { featuresData } from "../../Data/featuresData";

const {width, height} = Dimensions.get("window");

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.appLogo}>
        <Text style={styles.appLogoText}>Emo.ai</Text>
      </View>
      <WelcomeCarousel data={featuresData} navigation={navigation}/>
    </View>
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: width,
    paddingHorizontal: 4,
    paddingTop: StatusBar.currentHeight,
  },
  appLogo: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },
  appLogoText: {
    fontSize: 48,
    fontFamily: "Logo",
    color: colors.primary,
  }
});
