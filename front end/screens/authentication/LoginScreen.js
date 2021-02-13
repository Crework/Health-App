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
  Alert
} from "react-native";
import firebase from 'firebase';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../env";
import GoogleIcon from "../../assets/images/google.png";
import FacebookIcon from "../../assets/images/facebook.png";

import colors from "../../constants/colors";

const LoginScreen = ({ navigation }) => {
  let emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, seterror] = useState('');


  useEffect(() => {
    emailRef?.focus();
  }, []);


  function validateEmail(email) {
    console.log(email);
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
  }

  const onButtonPress = () => {
    seterror('');
    if(email.length==0 || Password.length==0){
      seterror('Email and Password cannot be blank');
    }
    else if(!validateEmail(email)){
      seterror('Enter a valid e-mail id');
    }
    else{
      firebase.auth().signInWithEmailAndPassword(email,Password)
      .then( async ()=>{
        console.log("here");
        const response = await fetch(`${env.url}/api/users/${email}/get-id`);
        const {foundUser} = await response.json()
        await AsyncStorage.setItem("userId", foundUser._id);
        await AsyncStorage.setItem("userName", foundUser.name);
        await AsyncStorage.setItem("userEmail", foundUser.email);
      })
      .then( ()=>{
        navigation.reset({
          index:0,
          routes: [{name:'ApplicationTabs'}]
        })
      })
      .catch((err)=>{
        console.log(err.message);
        seterror(err.message);
      })
    }

  }

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
      <View style={styles.loginHeader}>
        <Text style={styles.loginText}>Login</Text>
      </View>

      <KeyboardAvoidingView style={styles.loginForm} behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
          <Text style={styles.inputLabel}>E-MAIL</Text>

          <TextInput 
            autoCapitalize={"none"}
            style={styles.input} 
            ref={(email) => emailRef = email}
            value = {email}
            onChangeText ={(val)=>{ setEmail(val)}}
          />

          <Text style={styles.inputLabel}>PASSWORD</Text>
          <View style={[styles.input, styles.specialInput]}>
            <TextInput 
              style={{flex: 1, padding: 0, fontFamily: "Regular"}} 
              secureTextEntry={!showPassword}
              value={Password}
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

          <Text style={styles.errorStyle}>{error}</Text>
          
          <View style={styles.forgotPasswordContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate("ResetPassword");
              }}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.loginButtonContainer} 
        onPress={() => onButtonPress()}
      >
        <Text style={styles.loginButton}>Login</Text>
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
          Don't have an account ?
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 14,
              letterSpacing: 0.2,
              color: colors.primary,
              textDecorationLine: "underline",
            }}
          >
            Sign up
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
  loginHeader: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 22,
    fontFamily: "Bold",
    letterSpacing: 0.2,
  },
  loginForm: {
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
    alignItems: "center",
    marginBottom: 4
  },
  forgotPasswordContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 2
  },
  forgotPasswordText: {
    fontFamily: "Bold",
    color: colors.primary,
    letterSpacing: .4,
    fontSize: 14
  },
  loginButtonContainer: {
    width: "40%",
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  loginButton: {
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
    paddingHorizontal: 4,
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

export default LoginScreen;
