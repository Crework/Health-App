import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Image, Linking} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import colors from "../../constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
    const [moodAnalysisShown, setMoodAnalysisShown] = useState(false);
    const [wordCloudPrompted, setWordCloudPrompted] = useState(true);
    const [wordCloudShown, setWordCloudShown] = useState(false);
    const diaryEntries = [
        {
          id: "1",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          creationDate: "6 Jan 2021",
        },
        {
          id: "2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          creationDate: "7 Jan 2021",
        }
    ];
    const url1 = "https://youtu.be/q-9kPks0IfE";
    const url2 = "https://youtu.be/a2giXO6eyuI";
    const urlimg1 = "https://img.youtube.com/vi/q-9kPks0IfE/0.jpg";
    const urlimg2 = "https://img.youtube.com/vi/a2giXO6eyuI/0.jpg";
    var quote = "There are times when we stop, we sit still. We listen and breezes from a whole other world begin to whisper.";
    return (
        
        <View style={styles.screeen}>

                <View style = {styles.quoteContainer}>
                    <Text style={{fontFamily:"Quote", fontSize:200-4*(quote.length/44), textAlign:"center", color:"grey"}} adjustsFontSizeToFit >{quote}</Text>
                </View>

                <View style={styles.helloUserFlex}>
                    <View style={{width:"100%"}}>
                        <Text style={{...styles.helloStyle}}>Hello Ishant</Text>
                        <Text style={{color:colors.background, fontFamily:"Medium", fontSize:22, lineHeight:25, marginLeft:15, marginTop:2, opacity:0.8}}>How are you feeling today?</Text>

                        <TouchableOpacity activeOpacity={1} style={styles.addJournalButton} onPress={() => {navigation.navigate("NewWriting")}}>
                            <Ionicons name="add-sharp" size={32} color={colors.white} style={styles.addIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView 
                style={styles.scrollStyle}
                showsVerticalScrollIndicator={false}
                >
                <View style={styles.recentMoodContainer}>
                    <Text style={styles.headingStyle}>Know Your Mood</Text>
                

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
                                Total Journals
                            </Text>
                            <Text
                                style={{
                                fontFamily: "Medium",
                                color: colors.lightBlack,
                                letterSpacing: 0.4,
                                marginRight: 8,
                                }}
                            >
                                19
                            </Text>
                            </View>
                        </View>
                        </View>

                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => {
                            setWordCloudPrompted(!wordCloudPrompted);
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
                                wordCloudPrompted
                                    ? "keyboard-arrow-up"
                                    : "keyboard-arrow-down"
                                }
                                color={colors.lightBlack}
                                size={20}
                                style={{ marginRight: 8 }}
                            />
                            </View>
                        </View>
                        {wordCloudPrompted && (
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
                                World Cloud will generate a PNG/JPG Image consisting the most
                                used words in your journal. You can create multiple word clouds
                                by editing your text and regenerating.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                setWordCloudShown(true);
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
                        )}
                        {wordCloudShown && <View style={styles.wordCloud}></View>}
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => setMoodAnalysisShown(!moodAnalysisShown)}
                        >
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
                            <MaterialIcons
                                name={
                                moodAnalysisShown
                                    ? "keyboard-arrow-up"
                                    : "keyboard-arrow-down"
                                }
                                color={colors.lightBlack}
                                size={20}
                                style={{ marginRight: 8 }}
                            />
                            </View>
                        </View>
                        {moodAnalysisShown && <View style={styles.moodAnalysis}></View>}
                        </TouchableOpacity>
                    </View>
                
                <View style={styles.musicContainer}>
                    <Text style={styles.headingStyle}>Music For You</Text>
                    
                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => Linking.canOpenURL(url1).then(()=>{
                            Linking.openURL(url1);
                        })}
                        >
                        <View style={styles.row}>
                        <View>
                                <Image
                                    source={{uri:urlimg1}}
                                    style={{width:48, height:48, marginRight:20}}
                                />
                                <Ionicons
                                name="play-circle-outline"
                                color={colors.primary}
                                size={32}
                                style={{ position:"absolute" , top:8, left:8}}
                                />
                            </View>
                            <View style={styles.rowInfo}>
                            <Text
                                style={{
                                fontFamily: "Medium",
                                color: colors.lightBlack,
                                letterSpacing: 0.4,
                                fontSize:14,
                                }}
                            >
                                I'll Be There For You
                            </Text>
                            </View>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => Linking.canOpenURL(url2).then(()=>{
                            Linking.openURL(url2);
                        })}
                        >
                        <View style={styles.row}>
                            
                            <View>
                                <Image
                                    source={{uri:urlimg2}}
                                    style={{width:48, height:48, marginRight:20}}
                                />
                                <Ionicons
                                name="play-circle-outline"
                                color={colors.primary}
                                size={32}
                                style={{ position:"absolute" , top:8, left:8}}
                                />
                            </View>
                            <View style={styles.rowInfo}>
                            <Text
                                style={{
                                fontFamily: "Medium",
                                color: colors.lightBlack,
                                letterSpacing: 0.4,
                                fontSize:14,
                                }}
                            >
                                Set Fire to the Rain
                            </Text>
                            </View>
                        </View>
                        </TouchableOpacity>

                </View>

                <View style={styles.musicContainer}>
                    <Text style={styles.headingStyle}>Articles For You</Text>
                    
                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => Linking.canOpenURL(url1).then(()=>{
                            Linking.openURL(url1);
                        })}
                        >
                        <View style={styles.row}>
                            <Ionicons
                            name="newspaper-outline"
                            color={colors.primary}
                            size={40}
                            style={{ marginRight: 8 }}
                            />
                            <View style={styles.rowInfo}>
                            <Text
                                style={{
                                fontFamily: "Medium",
                                color: colors.lightBlack,
                                letterSpacing: 0.4,
                                fontSize:14,
                                }}
                            >
                                I'll Be There For You
                            </Text>
                            </View>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => Linking.canOpenURL(url2).then(()=>{
                            Linking.openURL(url2);
                        })}
                        >
                        <View style={styles.row}>
                            <Ionicons
                            name="newspaper-outline"
                            color={colors.primary}
                            size={40}
                            style={{ marginRight: 8 }}
                            />
                            <View style={styles.rowInfo}>
                            <Text
                                style={{
                                fontFamily: "Medium",
                                color: colors.lightBlack,
                                letterSpacing: 0.4,
                                fontSize:14,
                                }}
                            >
                                Set Fire to the Rain
                            </Text>
                            </View>
                        </View>
                        </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screeen:{
        flex: 1,
        width: width,
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: colors.white,
        position: "relative"
    },

    // quote style goes here
    quoteContainer:{
        marginTop:48,
        marginBottom:20,
        height: 60
    },

    //calendar style goes here
    calendarContainer:{
        flex:1.5
    },

    // hello user styles
    helloUserFlex: {
        width: "100%",
        backgroundColor:colors.primary,
        borderRadius:7,
        height:120,
        flexDirection:"row",
        marginBottom:8
    },
    helloStyle: {
        color:colors.background,
        fontSize:27,
        lineHeight:27,
        marginTop:40,
        fontFamily:'Name', 
        marginLeft:16
    },
    addJournalButton: {
        position:"absolute",
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 50,
        backgroundColor: colors.primary,
        elevation: 10,
        borderWidth:1,
        borderColor:"white",
        flexDirection:"row",
        right:4,
        bottom:-25
    },

    //scroll style
    scrollStyle: {
        marginTop:20
    },

    // heading style
    headingStyle:{
        fontFamily: "Bold",
        fontSize:20, 
        textAlign:'left', 
        color:"black",
        marginBottom:8
    },

    // image style
    imageStyles:{
        width:200,
        height:100,
        marginBottom:0,
        alignSelf:'flex-end'
    },

    //Know Your Recent Mood Styles
    recentMoodContainer:{
        marginVertical:8
    },
    recentMoodStyle:{
        marginTop:30,
        flex:3,
        alignItems:'center',
        justifyContent: 'center'
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
      borderRadius: 4
    },
    moodAnalysis: {
      marginTop: 12,
      height: 200,
      width: "100%",
      backgroundColor: colors.blurredSecondary,
      borderRadius: 4
    },

    // Music Styles
    musicContainer:{
        marginVertical:8
    },

    // Your Writing Styles
    yourWritingsStyle:{
        marginTop:20,
        flex:4,
    },
    writingImageStyles:{
        width:100,
        height:50,
        marginBottom:0,
        alignSelf:'flex-end'
    },
    dateText: {
        fontFamily: "Medium",
        fontSize: 16 ,
        color: colors.primary,
    },
    writingBoxStyle:{
        alignSelf:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    diaryEntryContainer: {
        marginHorizontal:10,
        width: "42%",
        height: 200,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: colors.greyBackground,
        shadowRadius:10
    },
    diaryContentContainer: {
        textAlign: "left",
    },
    diaryContent: {
        fontFamily: "Medium",
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 0.8,
        color: colors.darkGrey,
    }
});

export default HomeScreen;
