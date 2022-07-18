import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';

export default function FoodLogCard(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalScreen, setModalScreen] = useState();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { setModalScreen(props.log); setModalVisible(!modalVisible) }}
            >
                {props.img && <Image
                    style={{ width: '100%', height: '50%', borderRadius: 15, resizeMode: 'stretch' }}
                    source={props.img}
                />}
                <Text>{props.textContent}</Text>
            </TouchableOpacity>
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
                    <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => { setModalVisible(!modalVisible) }}
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
    )
}
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        margin: 5,
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
    },
    modalView: {
        flex: 1,
        position: "relative",
        marginTop: 60,
        width: deviceWidth - 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 45,
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
        position: "absolute",
        left: 10,
        top: 10
    }
});