// In App.js in a new project

import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import MySplashScreen from '../screens/Splash/MySplashScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home/Home';
import Header from '../components/header/Header';
import {getHeaderTitle} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Achivements from '../screens/Home/Achivements';
import Create from '../screens/Home/Create';
import Calender from '../screens/Home/Calender';
import TabComponent from '../components/Tab/TabComponent';
import Message from '../screens/Home/Message';

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
import BasicModal from '../components/BasicModal/BasicModal';

import {
  HeaderWithBackArrowButton,
  HeaderWithCrossButton,
} from './CommonHeaders';
import FlatListCheck from '../screens/Home/FlatList';

import {Logs} from '../components/Logs/Logs';
import LogsDetails from '../components/Logs/LogsDetails';
import {navigationRef} from './navigationServices';

import SplashScreen1 from '../screens/Splash/SplashScreen1';

// Create Stack Navigators
const SplashStack = createNativeStackNavigator();
const SplashScreen = () => (
  <SplashStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="SplashScreen1">
    <SplashStack.Screen name="SplashScreen1" component={SplashScreen1} />
    <SplashStack.Screen name="SplashContainer" component={MySplashScreen} />
  </SplashStack.Navigator>
);

const LoginStack = createNativeStackNavigator();
const LoginScreens = () => (
  <LoginStack.Navigator screenOptions={{headerShown: false}}>
    <LoginStack.Screen name="LoginScreen" component={Login} />
  </LoginStack.Navigator>
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

// Create Drawer Navigator
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Login" component={LoginScreens} />
  </Drawer.Navigator>
);
{
  /* <TabComponent {...props} /> */
}
//Tab navigation
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        if (props.navigation.getState().index != 4) {
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

      {/* <Tab.Screen
        name="Create"
        component={Message}
        options={{
          headerShown: true,

          tabBarStyle: {display: 'none'},
        }}
      /> */}

      {/*   <Tab.Screen
        name="Calender"
        component={Message}
        options={{headerShown: true}}
      /> */}

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
    <RootStack.Screen name="Main" component={DrawerScreen} />
    <RootStack.Screen name="HomeScreen" component={HomeStackScreens} />
  </RootStack.Navigator>
);

const LoderModalComponent = () => {
  const globalLoader = useSelector(isLoading);

  return (
    <BasicModal isModalVisible={globalLoader}>
      <ActivityIndicator size="large" color={colors.secondary} />
      <BaseText
        style={{
          marginTop: 10,
          fontSize: fontSize.font16,
          fontFamily: fontFamily.OxygenBold,
        }}>
        Loading...
      </BaseText>
    </BasicModal>
  );
};

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <RootStackScreen />
    <LoderModalComponent />
  </NavigationContainer>
);

export default AppNavigator;
