import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BaseText from '../../components/BaseText/BaseText';
import colors from '../../globals/colors';

const OFFICE_COORDINATES = [
  {latitude: 19.173884, longitude: 72.846613},
  {latitude: 19.175303, longitude: 72.846905},
  {latitude: 19.175255, longitude: 72.847291},
  {latitude: 19.173927, longitude: 72.84686},
];

const EXPANSION_DISTANCE = 10;

const metersToDegrees = (meters: any) => {
  const latConversion = 1 / 111139; // 1 degree latitude in meters
  const longConversion =
    1 / (111139 * Math.cos((OFFICE_COORDINATES[0].latitude * Math.PI) / 180)); // 1 degree longitude in meters at given latitude
  return {
    latitude: meters * latConversion,
    longitude: meters * longConversion,
  };
};

const Home = () => {
  const [isWithinArea, setIsWithinArea] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to function properly.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const isPointWithinExpandedRectangle = (userLat: any, userLong: any) => {
    const expandedOffset = metersToDegrees(EXPANSION_DISTANCE);

    const minLat =
      Math.min(...OFFICE_COORDINATES.map(point => point.latitude)) -
      expandedOffset.latitude;
    const maxLat =
      Math.max(...OFFICE_COORDINATES.map(point => point.latitude)) +
      expandedOffset.latitude;
    const minLong =
      Math.min(...OFFICE_COORDINATES.map(point => point.longitude)) -
      expandedOffset.longitude;
    const maxLong =
      Math.max(...OFFICE_COORDINATES.map(point => point.longitude)) +
      expandedOffset.longitude;

    return (
      userLat >= minLat &&
      userLat <= maxLat &&
      userLong >= minLong &&
      userLong <= maxLong
    );
  };

  const checkLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return; // Stop if permission is not granted

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        console.log(`Current position: ${latitude}, ${longitude}`); // Log current position

        const userIsInside = isPointWithinExpandedRectangle(
          latitude,
          longitude,
        );

        if (userIsInside) {
          setIsWithinArea(true);
          Alert.alert('Login allowed');
        } else {
          setIsWithinArea(false);
          Alert.alert('Login denied', 'You are outside the allowed area.');
        }
      },
      error => {
        console.error(error);
        Alert.alert('Error', 'Unable to retrieve location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.screenBackgroundColor}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <BaseText style={{color: colors.blackColor}}>HomeScreen</BaseText>
        <Button title="Check Login" onPress={checkLocation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
