import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons/faLocationArrow';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const DefaultRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.006866,
  longitudeDelta: 0.004757,
};
export default function Map(route) {
  const mapRef = useRef(null);
  const [currentRegion, setCurrentRegion] = useState(DefaultRegion);
  const { shop } = useContext(ShopContext);
  const [allShopData, setAllShopData] = useState(shop);
  useEffect(() => {
    setCoords();
  }, []);

  const getCoords = () => {
    mapRef.current.animateToRegion(currentRegion, 2 * 1000);
  };

  const setCoords = async () => {
    let temp = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      maximumAge: 5000,
    });
    setCurrentRegion({
      ...currentRegion,
      longitude: temp.coords.longitude,
      latitude: temp.coords.latitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: route.route.params.Lat,
          longitude: route.route.params.Long,
          latitudeDelta: 0.006866,
          longitudeDelta: 0.004757,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.route.params.Lat,
            longitude: route.route.params.Long,
          }}
          pinColor="black"
        />
        {allShopData &&
          allShopData.map((item, key) => (
            <Marker
              key={key}
              image={require('../../assets/icon/map_marker.png')}
              coordinate={{
                latitude: item.lat,
                longitude: item.long,
              }}
            >
              <Callout tooltip>
                <View key={item.id}>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>{item.location}</Text>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <TouchableOpacity
                      style={{
                        margin: 20,
                        backgroundColor: '#0782F9',
                        width: '80%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        console.log('123123123');
                        Linking.openURL(
                          'https://www.google.com/maps/dir/?api=1&origin=&destination=22.30678960858985, 114.23265417290528'
                        );
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 16,
                        }}
                      >
                        Map Map
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <View style={styles.wrap}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 90,
            height: 70,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1.5,
            shadowRadius: 3.5,
          }}
          onPress={() => getCoords()}
        >
          <FontAwesomeIcon icon={faLocationArrow} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrap: {
    flex: 1,
    position: 'absolute',
    right: 1,
    bottom: 1,
    margin: 15,
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
