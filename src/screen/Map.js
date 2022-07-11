import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// export default function Map(route, navigation){

const DefaultTokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.006866,
    longitudeDelta: 0.004757,
};
export default function Map(route, navigation) {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    // const [tokyoRegion, setTokyoRegion] = useState(DefaultTokyoRegion)

    // useEffect(() => {
    //     setCoords()
    // }, [])

    // const getCoords = () => {
    //     mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
    // }

    // const setCoords = async () => {
    //     let temp = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, maximumAge: 5000 });
    //     setTokyoRegion({ ...tokyoRegion, longitude: temp.coords.longitude, latitude: temp.coords.latitude })
    //     // getCoords();
    // }

    // const lat = route.route.params.Lat;
    // const long = route.route.params.Long;

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: route.route.params.Lat,
                    longitude: route.route.params.Long,
                    latitudeDelta: 0.006866,
                    longitudeDelta: 0.004757,
                }}
            >
                <Marker coordinate={{
                    latitude: route.route.params.Lat,
                    longitude: route.route.params.Long
                }}
                    pinColor="black"
                />
            </MapView>
            <View style={styles.wrap}>
                <Button title="Console" onPress={() => { console.log("tokyoRegion:", tokyoRegion) }} />
                {/* <Button title="Press 0" onPress={() => setCoords()} /> */}
                <Button title="Press" onPress={() => getCoords()} />
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