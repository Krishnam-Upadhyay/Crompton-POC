import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../globals/images';
import colors from '../../globals/colors';
import {useNavigation} from '@react-navigation/native';
import BaseText from '../BaseText/BaseText';
import {GetProfilePic} from '../CommonComponents/CommonComponents';
import {useSelector} from 'react-redux';
import {notificationCount} from '../../redux/selectors/selectors';
import fontSize from '../../globals/fontSize';

const Header = (props: any) => {
  const navigation = useNavigation<any>();
  const getNotiCount = useSelector(notificationCount);
  const handleLogoClick = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{backgroundColor: colors.screenBackgroundColor}}>
      <View style={styles.header}>
        <View style={styles.logoStyle}>
          <TouchableOpacity onPress={handleLogoClick}>
            <Image
              source={images.logo}
              style={styles.Logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bellView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NotificationScreen');
            }}>
            <View style={styles.notificationContainer}>
              <Icon
                name="bell"
                color={colors.headerBellColor}
                size={15}
                style={styles.bellIcon}
              />

              <View style={styles.badge}>
                <BaseText style={styles.badgeText}>{getNotiCount}</BaseText>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
            onLongPress={() => {
              navigation.navigate('Logs');
            }}>
            <GetProfilePic style={styles.profilePicture} isFromHeader={true} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.whiteColor,
    elevation: 5,
    shadowColor: colors.blackColor,
    shadowOffset: {width: 0, height: 2},
    borderRadius: 25,
    borderCurve: 'continuous',
    overflow: 'hidden',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoStyle: {},
  Logo: {
    width: 100,
    height: 40,
  },
  profilePicture: {
    width: 30,
    height: 30,
    marginLeft: 11,
    marginRight: 11,
    marginTop: 3,
    borderRadius: 20,
  },
  bellView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notification: {
    flexDirection: 'row',
  },
  notes: {
    color: 'white',
    borderRadius: 100,
    backgroundColor: '#FF7F0B',
  },
  notificationContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bellIcon: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -1,
    backgroundColor: colors.bellBadgeColor,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.whiteColor,
    fontSize: fontSize.font10,
    fontWeight: 'bold',
  },
});

export default Header;
