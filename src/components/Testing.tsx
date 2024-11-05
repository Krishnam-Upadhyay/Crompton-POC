import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {setTheme} from '../redux/features/Slices/themeSlice';
import {setUser, clearUser} from '../redux/features/Slices/userSlice';
import { Button, Text, View } from 'react-native';

const Testing: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSetTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleSetUser = () => {
    dispatch(setUser({name: 'John Doe', email: 'john.doe@example.com'}));
  };

  const handleClearUser = () => {
    dispatch(clearUser());
  };

  return (
    <View>
      <Text>Current Theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={handleSetTheme} />

      <Text>User Name: {user.name}</Text>
      <Text>User Email: {user.email}</Text>

      <Button title="Set User" onPress={handleSetUser} />
     
      <Button title="Clear User" onPress={handleClearUser} />
    </View>
  );
};

export default Testing;
