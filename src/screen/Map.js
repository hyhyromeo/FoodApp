import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons/faLocationArrow'
// export default function Map(route, navigation){

const DefaultRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.006866,
    longitudeDelta: 0.004757,
};
export default function Map(route, navigation) {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const [currentRegion, setCurrentRegion] = useState(DefaultRegion)

    useEffect(() => {
        setCoords()
    }, [])

    const getCoords = () => {
        mapRef.current.animateToRegion(currentRegion, 2 * 1000);
    }

    const setCoords = async () => {
        let temp = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, maximumAge: 5000 });
        setCurrentRegion({ ...currentRegion, longitude: temp.coords.longitude, latitude: temp.coords.latitude })
        // getCoords();
    }

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
                <Marker 
                    image={require('../../assets/icon/map_marker.png')}
                    coordinate={{
                        latitude: 22.3067,
                        longitude: 114.25237
                    }}
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>新樂園魚蛋粉</Text>
                                <Text>將軍澳調景嶺彩明街1號彩明商場2樓265號舖</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/map/1.jpg')}
                                />
                            </View>
                            <View style={styles.arrowBorder}/>
                            <View style={styles.arrow}/>
                        </View>
                    </Callout>
                </Marker>
                <Marker 
                    image={require('../../assets/icon/map_marker.png')}
                    coordinate={{
                        latitude: 22.30456,
                        longitude: 114.25176
                    }}
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>金記冰室</Text>
                                <Text>將軍澳景嶺路8號都會駅2樓R03及L2-027號舖</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/map/2.jpg')}
                                />
                            </View>
                            <View style={styles.arrowBorder}/>
                            <View style={styles.arrow}/>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.wrap}>
                {/* <Button title="Console" style={styles.mapButton} onPress={() => { console.log("currentRegion:", currentRegion) }} /> */}
                {/* <Button title="Press 0" onPress={() => setCoords()} /> */}
                {/* <Button title="Press"  style={styles.mapButton} onPress={() => getCoords()} /> */}
                <TouchableOpacity 
                    style={{
                        backgroundColor: 'white', 
                        borderRadius: 90, 
                        height: 70, 
                        width: 70, 
                        justifyContent:'center', 
                        alignItems:'center',
                        shadowColor: 'rgba(0,0,0, .4)',
                        shadowOffset: { height: 1, width: 1 },
                        shadowOpacity: 1.5,
                        shadowRadius: 3.5,
                    }}
                    onPress={() => getCoords()}
                >
                    <FontAwesomeIcon 
                        icon={faLocationArrow}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
        margin: 15
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#FFF',
        borderRadius: 6,
        borderColor: '#CCC',
        borderWidth: 0.5,
        padding:15,
        width: deviceWidth - 150,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
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
        resizeMode: 'cover'
    },
});