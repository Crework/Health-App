import React, { useState, useEffect, useRef } from "react";
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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

import GoogleIcon from "../../assets/images/google.png";
import FacebookIcon from "../../assets/images/facebook.png";

import colors from "../../constants/colors";
import {URL} from '@env';

const RegisterScreen = ({ navigation }) => {
  let fullNameRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  useEffect(() => {
    fullNameRef?.focus();
    console.log(URL);
  }, []);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpPressed = () =>{
    setLoading(true);
    setErrorMessage('');
    if(name.length==0 || email.length==0 || password.length==0 || confirmPassword.length==0){
      setErrorMessage('All fields are necessary');
      setLoading(false);
    }
    else if(password!=confirmPassword){
      setErrorMessage('Password field does not match');
      setLoading(false);
    }
    else{
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(()=>{
        fetch(`${URL}/api/users/add-new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
          })
        }).then(
          response => response.json()
        ).then(async ({newlyAddedUser:{_id}}) => {
          console.log(_id);
          await AsyncStorage.setItem("userId", _id);
          await AsyncStorage.setItem("userName", name);
          await AsyncStorage.setItem("userEmail", email);
          console.log("signing up");
          navigation.reset({
            index : 0,
            routes:[{'name':"ApplicationTabs"}]
          });
        }).catch(error => {
          console.log(error);
          setLoading(false);
        })
      })
      .catch((err)=>{
        setErrorMessage(err.message);
        console.log(err.message);
        setErrorMessage(err.errorMessage);
        setLoading(false);
      })
    }

  }



  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
      
      
      <View style={styles.signupHeader}>
        <Text style={styles.signUpText}>Create Account</Text>
      </View>
      <KeyboardAvoidingView style={styles.signupForm} behavior="padding" keyboardShouldPersistTaps="always">
        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.inputLabel}>FULL NAME</Text>
          <TextInput 
            style={styles.input} 
            ref={(fullName) => fullNameRef = fullName}
            value={name}
            onChangeText={(val)=>setName(val)}
          />
          <Text style={styles.inputLabel}>E-MAIL</Text>
          <TextInput 
            style={styles.input} 
            value={email}
            onChangeText={(val)=>setEmail(val)}
          />
          <Text style={styles.inputLabel}>PASSWORD</Text>
          <View style={[styles.input, styles.specialInput]}>
            <TextInput 
              style={{flex: 1, padding: 0, fontFamily: "Regular"}} 
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(val)=>setPassword(val)}
            />
            {showPassword ? (
              <Ionicons
                name="eye-off"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowPassword(!showPassword)}
                style={{marginRight: 4}}
              />
            ) : (
              <Ionicons
                name="eye"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowPassword(!showPassword)}
                style={{marginRight: 4}}
              />
            )}
          </View>
          <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
          <View style={[styles.input, styles.specialInput]}>
            <TextInput 
              style={{flex: 1, padding: 0, fontFamily: "Regular"}} 
              secureTextEntry={!showConfirmedPassword}
              value={confirmPassword}
              onChangeText={(val)=>setConfirmPassword(val)}
            />
            {showConfirmedPassword ? (
              <Ionicons
                name="eye-off"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
                style={{marginRight: 4}}
              />
            ) : (
              <Ionicons
                name="eye"
                size={20}
                color={colors.darkGrey}
                onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
                style={{marginRight: 4}}
              />
            )}
          </View>
        <Text style={styles.errorStyle}>{errorMessage}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.signupButtonContainer}
        onPress={() => { setLoading(true); signUpPressed();}}
      >
        {loading && <View style={{alignItems:'center', justifyContent:'center', 
    paddingVertical: 5}}>
            <ActivityIndicator
              size={"small"}
              color={colors.background}
            />
          </View>}
        {!loading && <Text style={styles.signupButton}>Sign Up</Text>}
      </TouchableOpacity>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>OR SIGN IN WITH</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.otherAuthMethodsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.authMethod, styles.authGoogle]}
        >
          <Image
            source={GoogleIcon}
            height={24}
            width={24}
            style={styles.authMethodLogo}
          />
          <Text style={styles.authMethodText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.authMethod, styles.authFacebook]}
        >
          <Image
            source={FacebookIcon}
            height={24}
            width={24}
            style={styles.authMethodLogo}
          />
          <Text style={[styles.authMethodText, { color: colors.white }]}>
            Facebook
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.authModeSwitcher}>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: 14,
            letterSpacing: 0.2,
            marginRight: 5,
          }}
        >
          Already have an account ?
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 14,
              letterSpacing: 0.2,
              color: colors.primary,
              textDecorationLine: "underline",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
  errorStyle:{
    color:"red",
    fontFamily:"Regular",
    fontSize: 12,
    letterSpacing:-0.5,
    marginLeft:12,
  },
  signupHeader: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: 22,
    fontFamily: "Bold",
    letterSpacing: 0.2,
  },
  signupForm: {
    width: "100%",
    marginTop: 50,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: "Regular",
    letterSpacing: 0.5,
    fontSize: 12,
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    backgroundColor: colors.differentGreyBackground,
    padding: 8,
    borderRadius: 12,
    marginBottom: 10,
    fontFamily: "Regular",
  },
  specialInput: {
    flexDirection: "row",
    alignItems: "center"
  },
  signupButtonContainer: {
    width: "40%",
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  signupButton: {
    fontFamily: "Bold",
    fontSize: 18,
    letterSpacing: 0.6,
    color: colors.white,
  },
  otherAuthMethodsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  separator: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  separatorText: {
    fontFamily: "Bold",
    letterSpacing: 0.5,
    fontSize: 12,
    color: colors.darkGrey
  },
  line: {
    height: 1,
    width: 60,
    marginHorizontal: 4,
    backgroundColor: colors.darkGrey,
  },
  authMethod: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  authGoogle: {
    backgroundColor: "#d7d7d7",
    marginRight: 12,
  },
  authFacebook: {
    backgroundColor: "#1877f2",
    marginLeft: 12,
  },
  authMethodLogo: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  authMethodText: {
    fontFamily: "Medium",
    fontSize: 14,
    letterSpacing: 0.2,
  },
  authModeSwitcher: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
});

export default RegisterScreen;
