import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Image, Linking} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux'
import colors from "../../constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import env from '../../env';
import {getAllJournals} from "../../redux/actions";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
    
    const journals = useSelector( state => state.journals);
    const dispatch = useDispatch();

    const [moodAnalysisShown, setMoodAnalysisShown] = useState(false);
    const [wordCloudPrompted, setWordCloudPrompted] = useState(true);
    const [wordCloudShown, setWordCloudShown] = useState(false);
    const [name, setName] = useState('');
    
    useEffect(()=>{
        const getUserId = async () => {
            const userId = await AsyncStorage.getItem("userId");
            dispatch(getAllJournals(userId));
            const userName = await AsyncStorage.getItem('userName');
            setName(userName);
        }
        getUserId();
    }, []);


    const url1 = "https://youtu.be/O-6f5wQXSu8";
    const url2 = "https://youtu.be/inpok4MKVLM";
    const url3 = "https://www.verywellmind.com/manage-your-anxiety-2584184";
    const url4 = "https://www.healthline.com/health/depression/how-to-fight-depression";
    const urlImg1 = "https://img.youtube.com/vi/O-6f5wQXSu8/0.jpg";
    const urlImg2 = "https://img.youtube.com/vi/inpok4MKVLM/0.jpg";
    var quote = "There are times when we stop, we sit still. We listen and breezes from a whole other world begin to whisper.";
    return (
        
        <View style={styles.screen}>

                <View style = {styles.quoteContainer}>
                    <Text style={{fontFamily:"Quote", fontSize:200-4*(quote.length/44), textAlign:"center", color:"grey"}} adjustsFontSizeToFit >{quote}</Text>
                </View>

                <View style={styles.helloUserFlex}>
                    <View style={{width:"100%"}}>
                        <Text style={{...styles.helloStyle}}>Hello {name}</Text>
                        <Text style={{color:colors.background, fontFamily:"Medium", fontSize:18, lineHeight:20, marginLeft:15, marginTop:2, opacity:0.8}}>How are you feeling today?</Text>
                    </View>
                </View>

                <ScrollView 
                style={styles.scrollStyle}
                showsVerticalScrollIndicator={false}
                >
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
                                    source={{uri:urlImg1}}
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
                                Meditation for Anxiety
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
                                    source={{uri:urlImg2}}
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
                                5-Minute Meditation you can do anywhere
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
                        onPress={() => Linking.canOpenURL(url3).then(()=>{
                            Linking.openURL(url3);
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
                                Manage your Anxiety
                            </Text>
                            </View>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                        activeOpacity={1}
                        style={styles.analysisCard}
                        onPress={() => Linking.canOpenURL(url4).then(()=>{
                            Linking.openURL(url4);
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
                                How to Fight Depression
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
    screen:{
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
