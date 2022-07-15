import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';

export default function FoodLog() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.buttonWrap}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}
                //onPress={() => navigation.navigate('All Resturant')}
                >
                    <Image
                        style={{ width: '100%', height: '50%', borderRadius: 15, resizeMode: 'stretch' }}
                        source={require('../../assets/icon/food-log-sample-1.jpg')}
                    />
                    <Text>5大越南Pho推介！灣仔米芝蓮推介名店、旺角區人氣牛柳牛丸粉</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}
                //onPress={() => navigation.navigate('Food Log')}
                >
                    <Image
                        style={{ width: '100%', height: '50%', borderRadius: 15, resizeMode: 'stretch' }}
                        source={require('../../assets/icon/food-log-sample-2.jpg')}
                    />
                    <Text>手工漢堡小店  麻堡</Text>
                </TouchableOpacity>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text>Test</Text>
                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Image
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            source={require('../../assets/icon/close.png')}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
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
        // padding: 10,
        // shadowColor: 'rgba(0,0,0, .4)',
        // shadowOffset: { height: 1, width: 1 },
        // shadowOpacity: 1.5,
        // shadowRadius: 0.1,
        // backgroundColor: '#fff',
    },
    modalView: {
        flex: 1,
        position: "relative",
        marginTop: 60,
        width: deviceWidth - 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeModal: {
        width: 30, height: 30,
        // backgroundColor: 'red',

        position: "absolute",
        left: 10,
        top: 10

    }
});