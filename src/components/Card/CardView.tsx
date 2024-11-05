import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../globals/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseText from '../BaseText/BaseText';
import fontSize from '../../globals/fontSize';
import {TouchableWithoutFeedback} from 'react-native';

const CardView = ({
  children,
  style = {},
  isMenuVisible = false,
  handleEdit,
  handleDelete,
}: any) => {
  const [showOptions, setShowOptions] = useState(false);

  const find_dimesions = (layout: any) => {
    const {x, y, width, height} = layout;
  };

  const handleMenuPress = () => {
    setShowOptions(!showOptions);
  };

  const onEditClick = () => {
    setShowOptions(false);
    handleEdit();
  };

  const onDeleteClick = () => {
    // Handle delete action
    setShowOptions(false);
    handleDelete();
  };

  return (
    <View
      style={{...styles.cardView, ...style}}
      onLayout={event => find_dimesions(event.nativeEvent.layout)}>
      {isMenuVisible ? (
        <>
          <View style={styles.menuButton}>
            <TouchableOpacity onPress={handleMenuPress} style={{padding: 5}}>
              <Icon name="ellipsis-horizontal" size={15} color="#333" />
            </TouchableOpacity>
          </View>
          {showOptions && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={onEditClick}>
                <Icon name="pencil" size={10} color="#333" />
                <BaseText style={styles.optionText}>Edit</BaseText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={onDeleteClick}>
                <Icon name="trash" size={10} color="#333" />
                <BaseText style={styles.optionText}>Delete</BaseText>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : null}
      {children}
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  cardView: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    // Elevation for Android
    elevation: 5,
    // Shadow properties for iOS
    shadowColor: colors.blackColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    right: 20,
    zIndex: 1, // Ensure it's above other content
    borderRadius: 10,
  },
  optionsContainer: {
    position: 'absolute',
    top: 0, // Position below the menu button
    right: 50,
    zIndex: 1,
    backgroundColor: colors.whiteColor,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  optionText: {
    marginLeft: 8,
    fontSize: fontSize.font14,
    color: '#333',
    fontFamily: 'Oxygen-Bold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Oxygen-Bold',
    color: '#333',
    paddingVertical: 5,
  },
});
