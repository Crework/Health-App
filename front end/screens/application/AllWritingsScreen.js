import React, { useEffect } from "react";
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
} from "react-native";
import {useAsyncStorage} from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import JournalCard from "../../components/JournalCard";
import {getAllJournals} from "../../redux/actions";


import colors from "../../constants/colors";

const {getItem} = useAsyncStorage("userId");


const AllWritingsScreen = ({ navigation }) => {

  const journals = useSelector(state => state.journals );

  const dispatch = useDispatch();
  
  useEffect(()=> {
    const userId = getItem().then(data => {
      return data;
    }).then().catch(err => {console.log(err)});
    fetch(`http://localhost:3000/api/journals/${userId}/get-all`)
    .then(
      response => response.json()
    ).then(
      data => {
        dispatch(getAllJournals(data))
      }
    )
  })


  return (
    <View style={styles.screen}>
      <View style={styles.searchBoxContainer}>
        <Ionicons name="search" size={22} color={colors.darkGrey} style={styles.searchLogo}/>
        <TextInput style={styles.searchInput} placeholder="Search Journals"/>
      </View>
      <FlatList
        contentContainerStyle={styles.journalContainer}
        data={journals}
        centerContent
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <JournalCard journal={item} navigation={navigation}/>;
        }}
      />
      <TouchableOpacity activeOpacity={1} style={styles.addJournalButton} onPress={() => {navigation.navigate("NewWriting")}}>
          <Ionicons name="add-sharp" size={32} color={colors.white} style={styles.addIcon}/>
      </TouchableOpacity>
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
