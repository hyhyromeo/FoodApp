import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const HomeButton1 = ({ navigation, latitude, longitude, allShop }) => {
  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('地圖', {
            Lat: latitude,
            Long: longitude,
          });
        }}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={require('../../assets/icon/map.png')}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            地圖
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Top 10')}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={require('../../assets/icon/crownai.png')}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Top 10
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

export default HomeButton1;
