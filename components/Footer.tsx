import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, EvilIcons, Feather } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { LikeDb } from "../src/models";

const Footer = ({ tweet }) => {
  //   const [like, setLike] = useState();
  const [user, setUser] = useState();
  const [checkLike, setCheckLike] = useState(null);

  //   const [likesData, setLikeData] = useState();
  const [likesCount, setLikesCount] = useState();

  //   useEffect(() => {
  //     const fetchLike = async () => {

  //       //   console.log(searchMyLike);
  //     };
  //     fetchLike();
  //   }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const submitLike = async () => {
    try {
      const likeData = await DataStore.save(
        new LikeDb({
          tweetdbID: tweet.id,
          userdbIDs: user.attributes.sub,
        })
      );
      //   setLike(likeData);
    } catch (error) {
      console.log(error);
    }

    const userData = await Auth.currentAuthenticatedUser();

    const likeData2 = await DataStore.query(LikeDb);
    const searchMyLike = likeData2.find(
      (like) => like.userdbIDs === userData.attributes.sub
    );

    setCheckLike(searchMyLike);
    // setLikesCount(likesCount + 1);
  
    console.log(searchMyLike);
  };


const deleteLike=async()=>{
const liketoDelete=await DataStore.query(LikeDb,{id:checkLike.id});

DataStore.delete(liketoDelete);
setCheckLike(null);
// setCheckLike(likesCount ? 0 : -1)

}


  const toggleLike = async () => {
    if (!user) {
      return;
    }
 if(!checkLike){
    await submitLike();
 }
 else{
    await deleteLike();
 }
 
  };

//   useEffect(() => {
//     setLikesNumberCount(tweet.numberOfLikes);
//   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Feather name="message-circle" size={20} color="gray" />
        <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>

      <View style={styles.row}>
        <EvilIcons name="retweet" size={30} color="gray" />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>

      <Pressable style={styles.row} onPress={toggleLike}>
        <AntDesign
          name={!checkLike ? "hearto" : "heart"}
          size={18}
          color={!checkLike ? "gray" : "#FD1D1D"}
        />
        <Text style={styles.number}>{likesCount}</Text>
      </Pressable>

      <View style={styles.row}>
        <EvilIcons name="share-google" size={28} color="gray" />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    color: "gray",
    marginLeft: 5,
  },
});
