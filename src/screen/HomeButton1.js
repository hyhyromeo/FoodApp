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
import {
  faMapLocationDot,
  faFireFlameCurved,
} from '@fortawesome/free-solid-svg-icons';
const HomeButton1 = ({ navigation, latitude, longitude, allShop }) => {
  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('FoodNearBy', {
            Lat: latitude,
            Long: longitude,
          });
        }}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <FontAwesomeIcon
            style={styles.fontIcon}
            icon={faMapLocationDot}
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
            FoodNearBy
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Top 10 Rating')}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <FontAwesomeIcon
            style={styles.fontIcon}
            icon={faFireFlameCurved}
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
            Top 10 Rating
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
  fontIcon: {
    color: 'lightblue',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1.5,
    shadowRadius: 1.5,
  },
});

export default HomeButton1;
