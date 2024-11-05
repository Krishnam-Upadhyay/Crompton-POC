import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../globals/images';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../globals/styles';
import colors from '../../globals/colors';

const TabComponent = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  // Icon mapping
  const Icons: any = {
    Home: (props: any) => <Image source={images.tabHomeIcon} {...props} />,
    /*   Achivements: (props: any) => <Image source={images.tabBageIcon} {...props} />,  */
    Create: (props: any) => <Image source={images.tabBarIcon} {...props} />,
    /*  Calender: (props: any) => <Image source={images.TabCalenderIcon} {...props} />,  */
    Message: (props: any) => (
      <Image source={images.TabCommentIcon} {...props} />
    ),
  };

  const Images: any = {
    Home: {
      focused: images.tabActiveHomeIcon, // Focused image
      unfocused: images.tabHomeIcon, // Default image
    },
    Badge: {
      focused: images.tabActiveBadgIcon,
      unfocused: images.tabBageIcon,
    },
    /*  Create: {
      focused: images.tabActiveBarIcon,
      unfocused: images.tabBarIcon,
    }, */
    /*  Calender: {
      focused: images.tabActiveCalenderIcon,
      unfocused: images.TabCalenderIcon,
    }, */

    Message: {
      focused: images.TabActiveMessagIcon,
      unfocused: images.TabCommentIcon,
    },
  };

  return (
    <View style={{backgroundColor: colors.screenBackgroundColor}}>
      <View style={style.tabBar}>
        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Skip rendering if the tab is not visible
          if (route?.params && !route?.params?.isVisible) {
            return null;
          }

          // Select image source based on focus state
          const imageSource = isFocused
            ? Images[route.name].focused
            : Images[route.name].unfocused;

          if (
            route?.params &&
            route?.params != undefined &&
            !route?.params?.isVisible
          ) {
            return null;
          }

          return (
            <TouchableOpacity
              key={route.name}
              style={style.tabItem}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Image
                source={imageSource}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabComponent;

const style = StyleSheet.create({
  tabBar: {
    // position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: colors.blackColor,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover', // Adjust the image display as needed
  },
  plusIcon: {
    position: 'absolute',
    top: 5, // Adjust these values to position the + icon
    right: 5,
  },
});
