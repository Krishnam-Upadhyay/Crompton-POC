import JailMonkey from "jail-monkey";
import moment from "moment";
import { Platform } from "react-native";
import deviceInfoModule from "react-native-device-info";
import NetInfo from "@react-native-community/netinfo";


//To check rooted device
export const checkRooted = () => {
  const isRooted = JailMonkey.isJailBroken();
  console.log(
    "🚀 ~ file: SplashUtils.ts:6 ~ checkRooted ~ isRooted:",
    isRooted,
  );

  return isRooted;
};

//To check Debug Mode
export const checkDebugMode = async () => {
  const isDebugMode = await JailMonkey.isDebuggedMode();
  console.log(
    "🚀 ~ file: SplashUtils.ts:16 ~ checkDebugMode ~ isDebugMode:",
    isDebugMode,
  );
  if (__DEV__) {
    return false;
  }
  return isDebugMode;
};

//To check If Emulator
export const checkIsEmulator = async () => {
  const isEmulator = await deviceInfoModule.isEmulator();
  console.log(
    "🚀 ~ file: SplashUtils.ts:23 ~ checkIsEmulator ~ isEmulator:",
    isEmulator,
  );
  if (__DEV__) {
    return false;
  }
  return isEmulator;
};

//To Check Internet Connectivity
export const checkInternetConnectivity = async () => {
  const isNetworkConnected = await NetInfo.fetch();

  return isNetworkConnected;
};