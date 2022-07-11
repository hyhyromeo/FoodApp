import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screen/Home';
import Map from './src/screen/Map';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return(
    <View style={styles.header}>
      <Image
        style={{ width: 40, height: 40, position:"absolute", top:-22, right:5, borderColor:"red",  borderWidth:1}}
        source={require('./assets/icon.png')}
      />
      <Text style={{ position:"absolute", left:5}}>
        Logo text
      </Text>
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
      }
    
    }
    />
    <Stack.Screen
      name="Map"
      component={Map}
    />
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
    borderColor:"yellow",  
    borderWidth:1,
    position:"relative",
    display:"flex",
    flexDirection: 'row',
    alignItems:'center'
  }
});
