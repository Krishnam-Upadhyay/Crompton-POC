import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import BaseText from '../BaseText/BaseText';
import colors from '../../globals/colors';

const Tile = ({
  logo,
  title,
  color,
  isSelected,
  onPress,
  disabled = false,
}: any) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} disabled={disabled}>
      <View style={[styles.tileContainer, isSelected && styles.selectedTile]}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.textContainer}>
          <BaseText style={(styles.title, {color: color})}>{title}</BaseText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    height: 50,
    borderRadius: 40,
    padding: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  selectedTile: {
    backgroundColor: colors.selectedTile,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 14,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Oxygen',
  },
});

export default Tile;
