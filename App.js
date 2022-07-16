import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screen/Home';
import Map from './src/screen/Map';
import TopTen from './src/screen/TopTen';
import FoodLog from './src/screen/FoodLog';
import AllShop from './src/screen/AllShop';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <View style={styles.header}>
      <Image
        style={{ width: '100%', height: 40, resizeMode: 'contain' }}
        source={require('./assets/icon/logo.png')}
      />
      {/* <Text style={{marginLeft:5}}>
        Logo
      </Text> */}
    </View>


  );
}

const StackNavigator = (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          // backgroundColor: '#f4511e',
          // padding:100

        }
      }}
    />
    <Stack.Screen name="Map" component={Map} />
    <Stack.Screen name="Top 10" component={TopTen} />
    <Stack.Screen name="Food Log" component={FoodLog} />
    <Stack.Screen name="All Resturant" component={AllShop} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      {StackNavigator}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    //position: "relative",
    width: Dimensions.get("window").width - 40,
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: 'center'
  }
});
