import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screen/Home';
import Map from './src/screen/Map';
import Tabs from './src/nav/Tabs';

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tabs/>
    // </NavigationContainer>
    <Home/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
