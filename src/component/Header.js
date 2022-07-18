import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const Header = (props) => {
    // const divStyle = {
    //     boxShadow: '1px 4px 9px #d3d3d3',
    // };
    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>{props.text}</Text>
        </View>
    );
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 90,
        backgroundColor: '#fff', //#d3d3d3
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 3 },
    },
    labelStyle: {
        fontSize: 24,
        fontWeight: '700'
    }
});

export default Header;