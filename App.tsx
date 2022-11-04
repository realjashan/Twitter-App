import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Amplify, Auth, DataStore } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import React, { useEffect } from "react";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { UserDb } from "./src/models";

Amplify.configure(awsconfig);

function App() {
  
 
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return "https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80";
  };

  useEffect(() => {
     
    const saveUserToDB = async () => {
      // get user  from cognito
      const userInfo = await Auth.currentAuthenticatedUser();

      if (!userInfo) {
        return;
      }
      const userId = userInfo.attributes.sub;

      // check if user exists in DB
      const user = (await DataStore.query(UserDb)).find(
        (user) => user.sub === userId
      );

    
      if (!user) {
        // if not, save user to db.
        await DataStore.save(
          new UserDb({
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),

            sub: userId,
          })
        );
      } else {
        console.warn("User already exists in DB");
      }
    };

    saveUserToDB();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    );
  }
}

const CustomTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#2f95dc",
    borderRadius: 10,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: "black",
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: "#90B6CD",
  },
};

export default withAuthenticator(App, { theme: CustomTheme });
