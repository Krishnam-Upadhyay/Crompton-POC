import {Alert, Dimensions, StyleSheet, Touchable, View} from 'react-native';
import BaseText from '../components/BaseText/BaseText';
import colors from '../globals/colors';
import fontSize from '../globals/fontSize';
import fontFamily from '../globals/fontFamily';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import images from '../globals/images';
import {isHeaderAlertShown} from '../redux/selectors/selectors';
import {store} from '../redux/store';
import {useSelector} from 'react-redux';

//Common Header with Cross Button
export const HeaderWithCrossButton = ({title = '', props}: any) => {
  const isAlertShown = useSelector(isHeaderAlertShown);

  const showALert = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to go back to the previous screen? Unsaved data will be discarded.',
      [
        {text: 'Cancel', style: 'destructive'},
        {
          text: 'Ok',
          onPress: () => {
            if (props.navigation.canGoBack()) {
              props.navigation.goBack();
            } else {
              Alert.alert('Failed to navigate to previous screen');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{width: '10%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={() => {
              // Alert.alert('Tesgt');
              // return;
              if (isAlertShown) {
                showALert();
              } else {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }
            }}>
            <Image
              source={images.headerCloseIcon}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '80%'}}>
          <BaseText style={styles.headerWCrossTitle}>{title}</BaseText>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}} />
      </View>
    </View>
  );
};

//for arrow backbutton
export const HeaderWithBackArrowButton = ({title = '', props}: any) => {
  const isAlertShown = useSelector(isHeaderAlertShown);

  const showALert = () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to go back to the previous screen? Unsaved data will be discarded.',
      [
        {text: 'Cancel', style: 'destructive'},
        {
          text: 'Ok',
          onPress: () => {
            if (props.navigation.canGoBack()) {
              props.navigation.goBack();
            } else {
              Alert.alert('Failed to navigate to previous screen');
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{width: '10%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              if (isAlertShown) {
                showALert();
              } else {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }
            }}>
            <Image
              source={images.backArrowIcon}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '80%'}}>
          <BaseText style={styles.headerWCrossTitle}>{title}</BaseText>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    width: '100%', // Full width of the screen
    justifyContent: 'space-between', // Distribute space between items
    alignItems: 'center',
  },
  headerWCrossTitle: {
    fontSize: fontSize.font18,
    fontFamily: fontFamily.OxygenBold,
    color: colors.whiteColor,
    // position: 'absolute',
    // left: '50%',
    // transform: [{translateX: -50}],
    // backgroundColor:'red',
    alignSelf: 'center',
  },
});
