import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { Modalize } from 'react-native-modalize';
import MapView, { Marker } from 'react-native-maps';

export default function TopTenCard({ shop }) {
  const mapRef = useRef(null);
  return (
    <View style={styles.containerContent}>
      <View
        style={{
          width: deviceWidth,
          backgroundColor: 'lightblue',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text
          style={{
            // fontWeight: 'bold',
            fontSize: 32,
            margin: 5,
            textAlign: 'center',
          }}
        >
          {shop.name}
        </Text>
      </View>

      <Image
        source={{ uri: shop.image }}
        style={{
          width: deviceWidth,
          height: 220,
          resizeMode: 'stretch',
        }}
      />
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 22, margin: 5 }}>評分: {shop.rating}</Text>
        <Text style={{ fontSize: 22, margin: 5 }}>類別: {shop.tag}</Text>
        <Text style={{ fontSize: 22, margin: 5 }}>地址: {shop.location}</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <MapView
          ref={mapRef}
          style={styles.map}
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
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
