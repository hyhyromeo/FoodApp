import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const IconLabel = ({location}) => {
    //console.log(props);
    return(
        <View style={styles.container}>
            <Icon
                name="ios-pin"
                type="ionicon"
                size={15}
                style={styles.iconStyle}
            />
            {/* <Text style={styles.labelStyle}>Shop 1&2, G/F, Island Lodge, 21-23 Kam Hong Street, North Point</Text> */}
            <Text style={styles.labelStyle}>{location}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 13
    },
    iconStyle: {
        marginRight: 2
    }
})

export default IconLabel;