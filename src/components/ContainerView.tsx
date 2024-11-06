import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../globals/colors';


const ContainerView = (props: any) => {
  const {style, children, key = Math.random()} = props;
  
  return (
    <View style={{...style, ...styles.containerStyle}} key={key}>
      {children}
    </View>
  );
};

export default ContainerView;

const styles = StyleSheet.create({
  containerStyle: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.whiteColor,
  },
});
