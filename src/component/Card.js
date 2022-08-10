import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import IconLabel from './IconLabel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Card = ({ info }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.imageContainer}
        resizeMode="cover"
        source={{ uri: info.image }}
      />

      <View style={styles.infoStyle}>
        <Text style={styles.titleStyle}>{info.name}</Text>
        <View
          style={{
            position: 'absolute',
            right: 0,
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <FontAwesomeIcon
            style={{
              color: 'lightblue',
            }}
            icon={faStar}
            size={20}
          />
          <Text>: {info.rating}</Text>
        </View>
        <Text style={styles.tagStyle}>{info.tag}</Text>
        <IconLabel location={info.location} />
      </View>
    </View>
  );
};

const radius = 20;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    width: deviceWidth - 40,
    height: 225,
    backgroundColor: '#fff',
    borderRadius: radius,
    shadowOpacity: 0.6,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 9,
  },
  imageContainer: {
    height: 130,
    width: deviceWidth - 40,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  tagStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default Card;
