import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

// export default function Map(route, navigation){
export default function Map(){
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    const tokyoRegion = {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.006866,
        longitudeDelta: 0.004757,
      };

    const getCoords = () => {
        mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
    }

    async function setCoords() {
        let temp = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced, maximumAge: 5000});
        tokyoRegion.latitude = temp.coords.latitude;
        tokyoRegion.longitude = temp.coords.longitude;
        getCoords();
    }

    //const lat = route.route.params.Lat;
    //const long = route.route.params.Long;

    return(
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 22.287422445231805,
                    longitude: 114.59495693919609,
                    latitudeDelta: 0.006866,
                    longitudeDelta: 0.004757,
                }}
            />
            <View style={styles.wrap}>
                <Button title="Console" onPress={() => {console.log(tokyoRegion)}}/>
                <Button title="Press 0" onPress={() => setCoords()}/>
                <Button title="Press" onPress={() => getCoords()}/>
            </View>
        </View>
    );
};



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
        flex: 1
      }
  });