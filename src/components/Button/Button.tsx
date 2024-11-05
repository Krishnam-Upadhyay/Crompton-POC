import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress}:{title:string,onPress:any}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
  
    backgroundColor: '#675DB0',
   
    borderWidth: 1,
    borderColor: '#675DB0',
    borderRadius: 26,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    paddingVertical:8,
    paddingHorizontal:33,
    fontSize: 16,
  },
});

export default Button;
