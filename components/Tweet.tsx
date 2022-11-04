import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { TweetType } from "../types";
import MainContainer from "./MainContainer";
import { DataStore } from "aws-amplify";
import { UserDb } from "../src/models";

const TweetComp = ({ tweet }) => {
  const [imageFeed, setImageFeed] = useState([]);

  const userID = tweet.user;

  useEffect(() => {
    const fetchUser = async () => {
      const FetchImage = await DataStore.query(UserDb, (ud) =>
        ud.sub("eq", userID)
      );

      setImageFeed(FetchImage[0]);
    };

    fetchUser();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
         
        padding:tweet.image ? 20 :10 ,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        justifyContent: "center",
        marginHorizontal:tweet.image ? 40 :0 ,
      
      }}
    >
      <ProfilePicture image={imageFeed.image} size={60} />

      <MainContainer tweet={tweet} />
    </View>
  );
};

export default TweetComp;

const styles = StyleSheet.create({});
