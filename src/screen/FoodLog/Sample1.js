import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

export default function Sample1() {
    return (
        <View style={styles.container}>

        </View>
    )
}


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'Top',
    },
    buttonWrap: {
        marginTop: 10,
        flexDirection: 'row'
    },
    button: {
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start",
        width: deviceWidth * 0.4,
        height: deviceHeight * 0.18,
        margin: 10,
        borderRadius: 10,
    }
});