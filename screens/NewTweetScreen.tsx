import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  Platform,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { Auth, DataStore, Storage } from "aws-amplify";

import { TweetDb, UserDb } from "../src/models";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const NewTweetScreen = () => {
  // const [imagePick, setImagePick] = useState("");
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disblekeyboard, setDisableKeyboard] = useState(false);
  const [tweetClicked, setTweetClicked] = useState(false);

  const [user, setUser] = useState();
  const [dbUserId, setDbUserId] = useState();
  const [id, setId] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userId = await userInfo.attributes.sub;
      setDbUserId(userId);

      const userData = await DataStore.query(UserDb, (u) =>
        u.sub("eq", userId)
      );
      setUser(userData[0]);
      setId(userData[0].id);
    };

    fetchUser();
  }, []);

  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const urlParts = imageUrl.split(".");

      const extension = urlParts[urlParts.length - 1];
      console.log(extension);
      const key = `${uuidv4()}.${extension}`;
      await Storage.put(key, blob);
      return key;
    } catch (error) {
      console.log(error);
    }
  };

  const postTweet = async () => {
    setTweetClicked(true);

    let fileKey;
    if (!!imageUrl) {
      fileKey = await uploadImage();
    }

    await DataStore.save(
      new TweetDb({
        content: tweet,
        image: fileKey,
        user: dbUserId,
        userdbID: id,
        // content: tweet,
        // image:imagePick,
        // user: dbUserId,
        // userdbID: id,
      })
    );
  };

  const showKeyBoard = () => {
    setDisableKeyboard(!disblekeyboard);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="close"
              size={30}
              color={Colors.light.tint}
              style={{ flex: 1 }}
            />
          </Pressable>

          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: tweetClicked ? "#90B6CD" : Colors.light.tint,
                width: tweetClicked ? 120 : 80,
              },
            ]}
            onPress={postTweet}
          >
            <Text style={styles.buttonText}>
              {tweetClicked ? "Tweeting..." : "Tweet"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.newTweetContainer}>
          <View>
            <ProfilePicture image={user?.image} />
          </View>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                multiline
                value={tweet}
                onChangeText={setTweet}
                style={[styles.textInput, { fontSize: !tweet ? 20 : 16 }]}
                placeholder={"Whats happening?"}
                placeholderTextColor="#C0C0C0"
              />
            </View>
            <Pressable onPress={pickImage}>
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            </Pressable>

            <Image
              source={{ uri: imageUrl }}
              style={[
                styles.image,
                { width: imageUrl ? 150 : 0, height: imageUrl ? 150 : 0 },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewTweetScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
    color: "white",
  },
  inputContainer: {
    marginLeft: 10,
  },
  textInput: {},
  imageInput: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  newTweetContainer: {
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  container: {
    padding: 10,
  },
  imagePickerText: {
    color: Colors.light.tint,
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
});
