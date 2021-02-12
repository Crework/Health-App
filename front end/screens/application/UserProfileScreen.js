import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";


const UserProfileScreen = ({ navigation }) => {
  console.log(new Date("2021-02-07T18:00:24.644Z").getDay());

  const onButtonPress = () => {
    firebase.auth().signOut()
    .then(()=>{
      navigation.reset({
        index : 0,
        routes : [{name:'AuthenticationStack'}]
      })
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.profileHeader}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color="black"
          style={styles.backLogo}
        />
      </View>
      <View style={styles.userDetails}>
        <View style={styles.userImageContainer}>
          <Image
            source={{
              uri:
                "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg",
            }}
            style={styles.userImage}
          />
          <View style={styles.editIconContainer}>
            <FontAwesome
              name="pencil"
              color={colors.white}
              size={12}
              style={styles.editIcon}
            />
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe00@gmail.com</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.analyticsReportButton}
        onPress={() => navigation.navigate("AnalysisReport")}
      >
        <Text style={styles.analyticsReportText}>Analysis Reports</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.moreOptions}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.moreOption}
          onPress={() => navigation.jumpTo("Write")}
        >
          <FontAwesome
            name="file-text"
            color={colors.darkGrey}
            size={16}
            style={styles.optionIcon}
          />
          <View style={styles.moreOptionInfo}>
            <Text style={styles.moreOptionText}>Total Journals</Text>
            <Text style={[styles.moreOptionText, {fontFamily: "Bold"}]}>12</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.moreOption}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <FontAwesome
            name="gear"
            color={colors.darkGrey}
            size={18}
            style={styles.optionIcon}
          />
          <View style={styles.moreOptionInfo}>
            <Text style={styles.moreOptionText}>Settings</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              color={colors.lightBlack}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.moreOption}
        >
          <Ionicons
            name="information-circle"
            color={colors.darkGrey}
            size={20}
            style={styles.optionIcon}
          />
          <View style={styles.moreOptionInfo}>
            <Text style={styles.moreOptionText}>App Info</Text>
            <Text style={[styles.moreOptionText, {color: colors.darkGrey}]}>v1.0.0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.moreOption}
          onPress={() => onButtonPress()}
        >
          <FontAwesome
            name="sign-out"
            color={colors.darkGrey}
            size={18}
            style={styles.optionIcon}
          />
          <View
            style={[
              styles.moreOptionInfo,
              { justifyContent: "flex-start", paddingVertical: 2 },
            ]}
          >
            <Text style={styles.moreOptionText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: "center",
  },
  profileHeader: {
    marginTop: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  backLogo: {
    position: "absolute",
    left: 0,
  },
  userDetails: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  userImageContainer: {
    position: "relative",
  },
  userImage: {
    height: 125,
    width: 125,
    borderRadius: 63,
    alignItems: "center",
    justifyContent: "center",
  },
  editIconContainer: {
    position: "absolute",
    right: 10,
    bottom: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontFamily: "Bold",
    letterSpacing: 0.8,
    color: colors.black,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: "Bold",
    letterSpacing: 1,
    color: colors.lightBlack,
  },
  analyticsReportButton: {
    backgroundColor: colors.primary,
    width: "55%",
    marginTop: 8,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 40,
  },
  analyticsReportText: {
    fontFamily: "Medium",
    fontSize: 16,
    letterSpacing: 0.5,
    color: colors.white,
  },
  moreOptions: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
  },
  moreOption: {
    backgroundColor: colors.differentGreyBackground,
    borderRadius: 40,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  moreOptionInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  moreOptionText: {
    fontFamily: "Medium",
    color: colors.lightBlack,
    letterSpacing: 0.4,
    fontSize: 14,
  },
  optionIcon: {
    marginRight: 12,
  },
});

export default UserProfileScreen;
