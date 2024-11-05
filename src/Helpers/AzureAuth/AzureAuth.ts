import moment from 'moment';
import AzureAuthConfig from '../../config/AzureAuthConfig';
import {setAuthData} from '../../redux/features/Slices/azureAdDataSlice';
import { Alert } from 'react-native';

export const callInitialFunction = async () => {
  console.log(
    '🚀 ~ file: SplashContainer.js:76 ~ callInitialFunction ~ azureAuthData:',
    azureAuthData,
  );
  console.log(
    '🚀 ~ file: SplashContainer.js:77 ~ callInitialFunction ~ store.getState().userSession.isUserLoggedin:',
    store.getState()?.userSession?.isUserLoggedin,
  );
  if (azureAuthData != null) {
    if (store.getState()?.userSession?.isUserLoggedin) {
      await updateTokenIfExpired(azureAuthData);

      var New_profile = JSON.parse(
        Decrypt(store?.getState()?.userObj?.userObj?.data),
      );

      console.log('New_profile: ', New_profile);

      if (!New_profile) {
        props.clearUserSession();
        props.navigation.navigate('LoginContainer', {
          fromuserInfo: 'userInfo',
        });

        // Alert.alert("Alert!", "Are you sure you want to logout?", [
        //   {
        //     text: "Cancel",
        //     onPress: () => null,
        //     style: "cancel",
        //   },
        //   { text: "saiiiiiii YES", onPress: () => logout_now() },
        // ]);
      } else {
        console.log('tab page');
        navigation.navigate('Tab');
      }

      userObj = New_profile;
      // socket = socket_client.OpenSocket();
      // socket.on("RESPONSE", (data) => { });
      // socket.emit("online");
    } else {
      console.log('demo page');
      navigation.navigate('Demo');
    }
  } else {
    console.log('demo page');
    //// navigation.navigate("Demo");
    navigation.navigate('LoginContainer');
  }
  SplashScreen.hide();
};

export const updateTokenIfExpired = async (azureAdData, dispatch) => {
  let isAuthenticated=false;
  let userId = azureAdData?.userId;
  if (userId) {
    console.log('Token Update Startd');
    try {
      let tokens = await AzureAuthConfig.auth.acquireTokenSilent({
        scope: 'User.Read',
        userId: userId,
      });
      console.log('Token Update Completed');
      console.log('Silent:', tokens);
      if(tokens){
      const userData={
        accessToken: tokens?.accessToken,
        expireOn: tokens?.expireOn,
        userId: tokens?.userId,
        userName: tokens?.userName,
      }
      dispatch(setAuthData(userData));
      isAuthenticated=true
    } else{
      Alert.alert("Failed to update Azure ad token")
      isAuthenticated=false
    }
    } catch (error) {
      console.log('Error while inserting data in db ', error);
      // logs.error("Error while inserting data in db ", error);
      isAuthenticated=false
    }
  }
  return isAuthenticated
};
