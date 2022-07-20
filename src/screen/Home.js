import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, TouchableOpacity, Button, Linking, Modal } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { Modalize } from 'react-native-modalize';
import Card from '../component/Card';
import Header from '../component/Header';
import Map from '../screen/Map';
import FoodLogCard from "./FoodLogCard";
import * as _ from 'lodash';
import Sample1 from './FoodLog/Sample1';
import Sample2 from './FoodLog/Sample2';
import HomeButton1 from './HomeButton1';
import HomeButton2 from './HomeBotton2';

const ads = [
    {
        image: require('../../assets/adv1modified.png'),
        url: 'https://google.com'
    },
    {
        image: require('../../assets/icon/placeholder-image.png'),
        url: 'https://youtube.com'
    },
    {
        image: require('../../assets/icon/placeholder-image.png'),
        url: 'https://yahoo.com.hk'

    }
]


const Home = ({ navigation }) => {
    const [url, setUrl] = useState('');
    const [urlOnChange, setUrlOnChange] = useState('');
    const [imgActive, setimgActive] = useState(0);
    const [location, setLocation] = useState(null);
    const [locationFlag, setLocationFlag] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const sheetRef = useRef(null);

    const modalizeRef = useRef(null);
    const onOpen = (e) => {
        console.log(e);
        setUrl(e);
        modalizeRef.current?.open();
    };
    let flag = false

    onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setimgActive(slide);
            }
        }
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, maximumAge: 5000 });
            setLocation(location);
        })();
    }, []);
    if (location) {
        flag = true
    }
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (

        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.wrapper}>
                <ScrollView
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    scrollEventThrottle={0}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.wrapper}
                >
                    {
                        ads.map((e, index) =>
                            <TouchableOpacity
                                key={index}
                                onPress={() => onOpen(e.url)}
                            >
                                <Image
                                    resizeMode='stretch'
                                    style={styles.wrapper}
                                    source={e.image}
                                />
                            </TouchableOpacity>
                        )
                    }

                </ScrollView>

                <View style={styles.wrapperDot}>
                    {
                        ads.map((e, index) =>
                            <Text
                                key={index}
                                style={imgActive === index ? styles.dotActive : styles.dot}
                            >
                                ●
                            </Text>
                        )
                    }
                </View>
            </View>
            <Modalize modalHeight={deviceHeight * 0.8} snapPoint={deviceHeight * 0.8} ref={modalizeRef}>
                <WebView
                    style={{ height: 720 }}
                    source={{ uri: url }}
                    onNavigationStateChange={setUrlOnChange.bind(this)}
                    startInLoadingState={false}
                />

            </Modalize>


            {flag && <HomeButton1 navigation={navigation} latitude={location.coords.latitude} longitude={location.coords.longitude} />}

            <HomeButton2 navigation={navigation} />
            <View><Text style={{ fontSize: 24, textAlign: 'left', marginTop: 15, width: deviceWidth - 25, fontWeight: 'bold' }}>飲食誌</Text></View>


            <View style={{ paddingTop: 10, width: deviceWidth }} contentContainerStyle={{ alignItems: "center" }}>
                <View >
                    {tempData.map((temp, i) =>
                    (
                        <FoodLogCard key={i} textContent={temp.textContent} horizontal={true} img={temp.img} log={temp.log} />)

                    )}
                </View>
            </View>
        </View>

    );
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    wrapper: {
        width: deviceWidth,
        height: deviceHeight * 0.35
    },
    wrapperDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive: {
        margin: 3,
        color: 'grey'
    },
    dot: {
        margin: 3,
        color: 'white'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonWrap: {
        marginTop: 15,
        flexDirection: 'row'
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        width: deviceWidth * 0.45,
        height: deviceHeight * 0.09,
        marginHorizontal: 8,
        justifyContent: 'center',
        borderRadius: 25,
        padding: 10,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1.5,
        shadowRadius: 3.5,
        backgroundColor: '#fff',
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
    },

]


export default Home;