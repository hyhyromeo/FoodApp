import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUtensils, faFileSignature } from '@fortawesome/free-solid-svg-icons';
const HomeButton2 = ({ navigation }) => {
  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('所有餐廳')}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <FontAwesomeIcon
            style={{ color: 'lightblue' }}
            icon={faUtensils}
            size={50}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: 20,
              // fontWeight: 'bold',
            }}
          >
            All Restaurant
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FoodLogs')}
      >
        <View style={{ flex: 2, marginLeft: 10, padding: 6 }}>
          <FontAwesomeIcon
            style={{ color: 'lightblue' }}
            icon={faFileSignature}
            size={50}
          />
        </View>

        <View style={{ flex: 4 }}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 10,
              // fontWeight: 'bold',
            }}
          >
            FoodLogs
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonWrap: {
    marginTop: 15,
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth * 0.45,
    height: deviceHeight * 0.09,
    marginHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1.5,
    shadowRadius: 3.5,
    backgroundColor: '#fff',
  },
});

export default HomeButton2;
