import React, { useRef } from 'react';
import {
  StyleSheet,
  Linking,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons/faDiamondTurnRight';
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons/faPhoneFlip';

export default function TopTenCard({ shop }) {
  const { theme } = useContext(ShopContext);
  const mapRef = useRef(null);
  return (
    <View style={styles.containerContent}>
      <View
        style={{
          width: deviceWidth,
          backgroundColor: 'lightblue',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 30,
        }}
      ></View>

      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            padding: 10,
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1.5,
            shadowRadius: 3.5,
          }}
        >
          <Image
            source={{ uri: shop.image }}
            style={{
              width: 190,
              height: 100,
              resizeMode: 'stretch',
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 32,
              textAlign: 'center',
            }}
          >
            {shop.name}
          </Text>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              textAlign: 'left',
              margin: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>評分: {shop.rating}</Text>

            <Text style={{ fontSize: 20 }}>類別: {shop.tag}</Text>
            <Text style={{ fontSize: 20 }}>電話: {shop.tel}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRadius: 10,
          flexDirection: 'row',
          width: '98%',
          justifyContent: 'space-around',
          alignContent: 'center',
          backgroundColor: theme,
          // borderWidth: 1,
          borderColor: 'grey',
          margin: 15,
          shadowColor: 'rgba(0,0,0, .4)',
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1.5,
          shadowRadius: 3.5,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 0.2,
            borderRightColor: 'grey',
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1.5,
            shadowRadius: 3.5,
          }}
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&origin=&destination=${shop.name}&travelmode=walking`
            );
          }}
        >
          <FontAwesomeIcon
            style={{
              color: 'white',
            }}
            icon={faDiamondTurnRight}
            size={50}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1.5,
            shadowRadius: 3.5,
          }}
          onPress={() => {
            Linking.openURL(`tel:${shop.tel}`);
          }}
        >
          <FontAwesomeIcon
            style={{
              color: 'white',
            }}
            icon={faPhoneFlip}
            size={50}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 22, marginBottom: 10 }}>
          地址: {shop.location}
        </Text>
        <View
          style={{
            alignItems: 'center',
            padding: 10,
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1.5,
            shadowRadius: 3.5,
          }}
        >
          <MapView
            ref={mapRef}
            style={styles.map}
            provider="google"
            initialRegion={{
              latitudeDelta: 0.006866,
              longitudeDelta: 0.004757,
              latitude: shop.lat,
              longitude: shop.long,
            }}
          >
            <Marker
              image={require('../../assets/icon/map_marker.png')}
              coordinate={{
                latitude: shop.lat,
                longitude: shop.long,
              }}
            ></Marker>
          </MapView>
        </View>
      </View>
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  map: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    height: deviceWidth - 150,
    width: deviceWidth - 50,
    borderRadius: 20,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderColor: '#CCC',
    borderWidth: 0.5,
    padding: 15,
    width: deviceWidth - 150,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  image: {
    width: deviceWidth - 180,
    height: 100,
    resizeMode: 'cover',
  },
});
