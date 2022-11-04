import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { TweetType } from "../types";
import { Entypo } from "@expo/vector-icons";
import Footer from "./Footer";
import moment from "moment";
import { DataStore } from "aws-amplify";
import { UserDb } from "../src/models";
import {S3Image} from 'aws-amplify-react-native';

const MainContainer = ({ tweet }) => {
  const [lines, setLines] = useState(false);
  const [userName, setUserName] = useState([]);

  const userID = tweet.user;

  useEffect(() => {
    const fetchUser = async () => {
      const FetchUserName = await DataStore.query(UserDb, (ud) =>
        ud.sub("eq", userID)
      );

      setUserName(FetchUserName[0]);
      
    };

    fetchUser();
  }, []);

  const showMore = () => {
    setLines(!lines);
  };

 

  return (
    <View style={{ marginHorizontal: 10, flex: tweet.image ? 0 : 1 }}>
      <View style={[styles.tweetHeader]}>
        <View style={[styles.tweetHeaderNames]}>
          <Text style={styles.name}>{userName?.name} </Text>
          <Text style={styles.username}> @{userName?.username}</Text>
          <Text style={[styles.createdAt, { flex: tweet.image ? 0 : 1 }]}>
            &#8226;{moment(tweet.createdAt).fromNow()}
          </Text>
        </View>
        <View style={styles.moreIcon}>
          <Entypo name="chevron-down" size={16} color={"gray"} />
        </View>
      </View>

      <View>
        <Pressable onPress={showMore}>
          <View>
            {!lines ? (
              <Text style={styles.content} numberOfLines={5}>
                {tweet.content}
              </Text>
            ) : (
              <View>
                <Text style={styles.content2}>{tweet.content}</Text>
              </View>
            )}
          </View>
        </Pressable>

        {!!tweet.image && (
          
            <S3Image
              imgKey={tweet.image}
              style={{
                height: 200,
                width: 270,
                resizeMode: "cover",
                borderRadius: 10,
                overflow: "hidden",
                marginVertical: 5,
               
              }}
            />
       
        )}
      </View>
      <Footer tweet={tweet} />
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
  },
  username: {
    color: "gray",
  },

  createdAt: {
    color: "gray",
  },
  tweetHeaderNames: {
    flexDirection: "row",

    flex: 1,

    // backgroundColor:'red',
  },
  tweetHeader: {
    flexDirection: "row",
  },
  moreIcon: {},
  content: {
    marginVertical: 5,
  },
  content2: {
    marginVertical: 5,
  },
});
