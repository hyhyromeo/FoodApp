import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function FoodLogCard(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalScreen, setModalScreen] = useState();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={props.horizontal ? styles.buttonHorizontal : styles.button}
        onPress={() => {
          setModalScreen(props.log);
          setModalVisible(!modalVisible);
        }}
      >
        {props.img && (
          <Image
            style={props.horizontal ? styles.imgHorizontal : styles.img}
            source={props.img}
          />
        )}
        <Text style={{ marginTop: 3, flex: 1, marginRight: 10 }}>
          {props.textContent}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              source={require('../../assets/icon/close.png')}
            />
          </TouchableOpacity>
          {modalScreen}
        </View>
      </Modal>
    </View>
  );
}
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'Top',
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  button: {
    flexDirection: 'column',
    width: deviceWidth * 0.4,
    height: deviceHeight * 0.15,
    margin: 8,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  buttonHorizontal: {
    flexDirection: 'row',
    width: deviceWidth - 15,
    height: deviceHeight * 0.1,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: '65%',
    borderRadius: 15,
    resizeMode: 'stretch',
  },
  imgHorizontal: {
    width: deviceWidth * 0.4,
    height: '90%',
    borderRadius: 15,
    resizeMode: 'stretch',
    marginRight: 15,
  },
  modalView: {
    flex: 1,
    position: 'relative',
    marginTop: 60,
    width: deviceWidth - 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModal: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 10,
    top: 10,
  },
});
