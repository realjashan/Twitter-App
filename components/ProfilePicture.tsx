import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export type ProfilePictureProps = {
  image?: string;
  size?: number;
};

const ProfilePicture = ({ image, size = 50 }: ProfilePictureProps) => {
  return (
    <Image
      source={{
        uri: image,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
    />
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({});
