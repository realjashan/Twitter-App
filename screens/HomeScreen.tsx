import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfilePicture from "../components/ProfilePicture";
import Tweet from "../components/Tweet";

import tweets from '../data/tweets';
import Feed from "../components/Feed";
import NewTweet from "../components/NewTweet";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Tweet tweet={tweets[0]} />
       */}
    
    <Feed/>
    <NewTweet/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
   justifyContent:'center',
 
  }
});
