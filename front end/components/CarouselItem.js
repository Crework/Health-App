import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

let { width, height } = Dimensions.get("window");

const CarouselItem = ({ item, navigation }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={item.url}
            height={height * 0.45}
            width={width - 8}
            style={styles.image}
          />
        </View>
        <View style={styles.featureInfo}>
          <Text style={styles.featureTitle}>{item.title}</Text>
          <Text style={styles.featureDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.appEntryContainer}>
        {item.id === 4 && (
          <View style={styles.entryButtons}>
            <TouchableOpacity activeOpacity={1} style={styles.loginButton} onPress={() => navigation.replace("Login")}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} style={styles.signupButton} onPress={() => navigation.replace("Register")}>
              <Text style={styles.signupText}>Get Started</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={colors.white}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: width - 8,
    paddingVertical: 12,
    height: height * 0.75,
    alignItems: "center",
  },
  itemHeader: {
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    height: height * 0.45,
    width: width - 8,
    resizeMode: "contain",
  },
  featureInfo: {
    width: "90%",
  },
  featureTitle: {
    fontSize: 20,
    lineHeight: 36,
    fontFamily: "Medium",
    letterSpacing: 0.3,
    color: colors.black,
    textAlign: "center",
    marginBottom: 12
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Regular",
    letterSpacing: 0.5,
    color: colors.lightBlack,
    textAlign: "center",
  },
  appEntryContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 24
  },
  entryButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  signupButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    fontFamily: "Bold",
    letterSpacing: 1,
    fontSize: 18,
    color: colors.white,
    marginRight: 4
  },
  loginText: {
    fontFamily: "Bold",
    letterSpacing: 1,
    fontSize: 16,
    color: colors.primary,
  },
});
