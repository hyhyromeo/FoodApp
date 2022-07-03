import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import IconLabel from './IconLabel';

const Card = ({info}) => {
    // const json = JSON.stringify(props.info);
    // console.log(json)
    return (
        <View style={styles.cardContainer}>
            <Image
                style={styles.imageContainer}
                source={info.image}
            />
            <View style={styles.infoStyle}>
                <Text style={styles.titleStyle}>{info.name}</Text>
                <Text style={styles.tagStyle}>{info.tag}</Text>
                <IconLabel location={info.location}/>
            </View>
            
        </View>
    );
};

const deviceWidth = Dimensions.get("window").width;
const radius = 20;

const styles = StyleSheet.create({
    cardContainer: {
      marginTop: 10,
      width: deviceWidth - 40,
      //padding: 10,
      height: 200,
      backgroundColor: '#fff',
      borderRadius: radius,
    //   alignItems: 'center',
    //   justifyContent: 'flex-end',
    //   paddingBottom: 20,
       shadowOpacity:0.6,
       shadowRadius:5,
       shadowOffset: { width: 0, height: 3 },
       elevation: 9
    },
    imageContainer: {
        height: 130,
        width: deviceWidth - 40,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '800'
    },
    tagStyle: {
        fontWeight: '200'
    },
    infoStyle: {
        //padding: 10
        marginHorizontal: 10,
        marginVertical: 5
    }
});

export default Card;