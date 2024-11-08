// In App.js in a new project

import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MySplashScreen from '../screens/Splash/MySplashScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home/Home';
import Header from '../components/header/Header';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabComponent from '../components/Tab/TabComponent';

import colors from '../globals/colors';
import Profile from '../screens/Profile/Profile';

import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../globals/images';
import BaseText from '../components/BaseText/BaseText';
import fontSize from '../globals/fontSize';
import fontFamily from '../globals/fontFamily';
import {useSelector} from 'react-redux';
import {isLoading} from '../redux/selectors/selectors';

import {
  HeaderWithBackArrowButton,
  HeaderWithCrossButton,
} from './CommonHeaders';

import {Logs} from '../components/Logs/Logs';
import LogsDetails from '../components/Logs/LogsDetails';
import {navigationRef} from './navigationServices';

// Create Stack Navigators
const SplashStack = createNativeStackNavigator();
const SplashScreen = () => (
  <SplashStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="SplashContainer">
    <SplashStack.Screen name="SplashContainer" component={MySplashScreen} />
  </SplashStack.Navigator>
);

const HomeStack = createNativeStackNavigator();
const HomeStackScreens = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomeStackScreen" component={Tabs} />
  </HomeStack.Navigator>
);

const LogsStack = createNativeStackNavigator();
const LogsStackScreens = () => (
  <LogsStack.Navigator screenOptions={{headerShown: false}}>
    <LogsStack.Screen name="LogsStack" component={Logs} />
    <LogsStack.Screen name="LogsDetails" component={LogsDetails} />
  </LogsStack.Navigator>
);

// const BehaviourStack = createNativeStackNavigator();
// const LogsStackScreens = () => (
//   <BehaviourStack.Navigator screenOptions={{headerShown: false}}>
//     <BehaviourStack.Screen name="LogsStack" component={Logs} />
//     <BehaviourStack.Screen name="LogsDetails" component={LogsDetails} />
//   </BehaviourStack.Navigator>
// );

// const HomeStackScreens = () => (
// <HomeStack.Navigator >

// <HomeStack.Screen options={{
// title: 'Add Behaviour',
// headerTitleStyle:{
// color:colors.addBehaviourTitileColor,
// fontFamily: 'Oxygen-Bold',
// },
// headerStyle:{

// backgroundColor:colors.addBehaviourHeaderBackgroundColor,

// } ,
// headerTitleAlign: 'center',
// }} name='addBehaviour' component={AddBehaviour} />
// </HomeStack.Navigator>
// );

//Tab navigation
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        if (props.navigation.getState().index != 1) {
          return <TabComponent {...props} />;
        }
        return null;
      }}
      screenOptions={({route}) => ({
        header: props => <Header {...props} />,
        tabBarStyle: (route => {
          const routeName = route.name;
          console.log('routeName: ', routeName);
          if (routeName == 'Create') {
            return {display: 'none'}; // Hide the tab bar for Create screen
          }
          if (routeName == 'Message') {
            return {display: 'none'};
          }
          return {display: 'flex'}; // Show the tab bar for other screens
        })(route),
      })}>
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{isVisible: false}}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

// Root Stack
const RootStack = createNativeStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator
    initialRouteName="Splash"
    screenOptions={{headerShown: false}}>
    <RootStack.Screen name="Splash" component={SplashScreen} />

    <RootStack.Screen name="HomeScreen" component={HomeStackScreens} />
  </RootStack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <RootStackScreen />
  </NavigationContainer>
);

export default AppNavigator;
