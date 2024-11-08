import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {azureAuthData, userDetails} from '../../redux/selectors/selectors';

import BaseText from '../BaseText/BaseText';
import colors from '../../globals/colors';
import fontSize from '../../globals/fontSize';
import fontFamily from '../../globals/fontFamily';
import images from '../../globals/images';

export const GetProfilePic = ({style, isFromHeader = false}: any) => {
  const userData = useSelector(userDetails);

  if (userData?.ProfilePhoto) {
    const base64Image = 'data:image/png;base64,' + userData.ProfilePhoto;

    return (
      <FastImage
        style={{...styles.profilePic, ...style}}
        source={{
          uri: base64Image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  } else {
    /*  return (
      <View style={isFromHeader ? styles.profileImg4 : styles.profileImg3}>
        <BaseText
          style={
            isFromHeader ? styles.creatorNameStyle2 : styles.creatorNameStyle
          }>
          {userInitials}
        </BaseText>
      </View>
    ); */

    //added ProfilePic
    return (
      <FastImage
        style={{...styles.profilePic, ...style}}
        source={images.defaultUserPicIcon}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }
};

const styles = StyleSheet.create({
  profilePic: {width: 100, height: 100, borderRadius: 50},
  profileImg3: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.splashScreenBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    marginTop: 5,
  },
  profileImg4: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: colors.screenBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 5,
  },
  creatorNameStyle: {
    fontSize: fontSize.font24,
    fontFamily: fontFamily.OxygenBold,
    alignItems: 'center',
  },
  creatorNameStyle2: {
    fontSize: fontSize.font16,
    fontFamily: fontFamily.OxygenBold,
    alignItems: 'center',
  },
});
