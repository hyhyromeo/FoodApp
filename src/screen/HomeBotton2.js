import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const HomeButton2 = ({ navigation }) => {
  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('所有餐廳')}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={require('../../assets/icon/restaurant.png')}
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
            所有餐廳
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('飲食誌')}
      >
        <View style={{ flex: 2, padding: 6 }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={require('../../assets/icon/fork-logo.png')}
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
            飲食誌
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
