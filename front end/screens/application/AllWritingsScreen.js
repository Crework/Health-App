import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import JournalCard from "../../components/JournalCard";
import {getAllJournals} from "../../redux/actions";
import env from "../../env";


import colors from "../../constants/colors";


const AllWritingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const journals = useSelector(state => state.journals);
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    const getUserId = async () => {
        const userId = await AsyncStorage.getItem("userId");
        return new Promise((resolve, reject) => resolve(dispatch(getAllJournals(userId))));
    }
    getUserId().then(()=>setLoading(false));
  }, [dispatch]);
  console.log(journals);
  
  const onPlusButtonClicked = () => {
    console.log(new Date(journals[0].createdAt).toDateString(), new Date().toString())
    if(journals.length && new Date(journals[0].createdAt).toDateString() === new Date().toDateString())
      navigation.navigate("EditWriting", {journal: journals[0]});
    else navigation.navigate('NewWriting');
  }

  return (
    <View style = {{flex:1}}>
      {loading && <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
        <ActivityIndicator size = {"large"} color = {colors.primary} />
      </View>}
      
      {!loading && <View style={styles.screen}>
        <View style={styles.searchBoxContainer}>
          <Ionicons name="search" size={22} color={colors.darkGrey} style={styles.searchLogo}/>
          <TextInput style={styles.searchInput} placeholder="Search Journals"/>
        </View>
        <FlatList
          contentContainerStyle={styles.journalContainer}
          data={journals}
          centerContent
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <JournalCard journal={item} navigation={navigation}/>;
          }}
        />
        <TouchableOpacity activeOpacity={1} style={styles.addJournalButton} onPress={() => {onPlusButtonClicked()}}>
            <Ionicons name="add-sharp" size={32} color={colors.white} style={styles.addIcon}/>
        </TouchableOpacity>
      </View>}

    </View>
  );
};
 
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight + 4,
    paddingBottom: 12,
    position: "relative",
    backgroundColor: colors.white,
  },
  journalHeader: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingVertical: 4,
    justifyContent: "center"
  },
  searchBoxContainer: {
    alignSelf: "center",
    width: "100%",
    backgroundColor: colors.differentGreyBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 8,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20
  },
  searchLogo: {
    marginRight: 2
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: colors.black,
    letterSpacing: .75,
    paddingHorizontal: 8,
    fontFamily: "Medium"
  },
  addJournalLogo: {
    position: "absolute",
    right: 0,
  },
  journalContainer: {
    marginTop: 8,
    alignItems: "center",
    width: "100%",
  },
  addJournalButton: {
    position: "absolute",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: colors.primary,
    elevation: 10,
    bottom: 25,
    right: 25,
  },
});

export default AllWritingsScreen;
