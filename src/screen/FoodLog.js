import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Sample1 from './FoodLog/Sample1'
import Sample2 from './FoodLog/Sample2'
import FoodLogCard from "./FoodLogCard";

export default function FoodLog() {
    return (
        <View style={styles.container}>
            <View style={styles.buttonWrap}>
                {tempData.map((temp, i) => (
                    <FoodLogCard key={i} textContent={temp.textContent} img={temp.img} log={temp.log} />
                ))}
            </View>
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

const tempData = [
    {
        // img: "https://www.eatthis.com/wp-content/uploads/sites/4/2022/05/steak-n-shake-7x7-steakburger.jpg?quality=82&strip=1&w=970",
        img: require("../../assets/icon/food-log-sample-1.jpg"),
        textContent: "5大越南Pho推介！灣仔米芝蓮推介名店、旺角區人氣牛柳牛丸粉",
        log: <Sample1 />
    },
    {
        // img: "https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591",
        img: require("../../assets/icon/food-log-sample-2.jpg"),
        textContent: "一年一度！全港4大榴槤放題/自助餐集合",
        log: <Sample2 />

    }
]