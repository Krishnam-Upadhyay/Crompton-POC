import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Card = ({ description }:{description:any}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMenuPress = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    // Handle edit action
    console.log('Edit pressed');
  };

  const handleDelete = () => {
    // Handle delete action
    console.log('Delete pressed');
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Icon name="ellipsis-horizontal" size={15} color="#333" />
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
            <Icon name="pencil" size={10} color="#333" />
            <Text style={styles.optionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={handleDelete}>
            <Icon name="trash" size={10} color="#333" />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 80, // Adjusted height for better layout
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginVertical:5,
    position: 'relative', // Required for positioning menu icon
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    right: 10,
    zIndex: 1, // Ensure it's above other content
  },
  optionsContainer: {
    position: 'absolute',
    top: 20, // Position below the menu button
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
   
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 10,
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

export default Card;
