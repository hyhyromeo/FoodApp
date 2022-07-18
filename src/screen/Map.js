import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons/faLocationArrow'

const DefaultRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.006866,
    longitudeDelta: 0.004757,
};
export default function Map(route, navigation) {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const [currentRegion, setCurrentRegion] = useState(DefaultRegion)

    useEffect(() => {
        setCoords()
    }, [])

    const getCoords = () => {
        mapRef.current.animateToRegion(currentRegion, 2 * 1000);
    }

    const setCoords = async () => {
        let temp = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, maximumAge: 5000 });
        setCurrentRegion({ ...currentRegion, longitude: temp.coords.longitude, latitude: temp.coords.latitude })
        // getCoords();
    }

    // const lat = route.route.params.Lat;
    // const long = route.route.params.Long;

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: route.route.params.Lat,
                    longitude: route.route.params.Long,
                    latitudeDelta: 0.006866,
                    longitudeDelta: 0.004757,
                }}
            >
                <Marker coordinate={{
                    latitude: route.route.params.Lat,
                    longitude: route.route.params.Long
                }}
                    pinColor="black"
                />
                {
                    itemData.map((item, key) => (
                        <Marker
                            key={key}
                            image={require('../../assets/icon/map_marker.png')}
                            coordinate={{
                                latitude: item.lat,
                                longitude: item.long
                            }}
                        >
                            <Callout tooltip>
                                <View key={item.id}>
                                    <View style={styles.bubble}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text>{item.location}</Text>
                                        <Image
                                            style={styles.image}
                                            source={item.image}
                                        />
                                    </View>
                                    <View style={styles.arrowBorder} />
                                    <View style={styles.arrow} />
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
                {/* <Marker
                    image={require('../../assets/icon/map_marker.png')}
                    coordinate={{
                        latitude: 22.3067,
                        longitude: 114.25237
                    }}
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>新樂園魚蛋粉</Text>
                                <Text>將軍澳調景嶺彩明街1號彩明商場2樓265號舖</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/map/1.jpg')}
                                />
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker>
                <Marker
                    image={require('../../assets/icon/map_marker.png')}
                    coordinate={{
                        latitude: 22.30456,
                        longitude: 114.25176
                    }}
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>金記冰室</Text>
                                <Text>將軍澳景嶺路8號都會駅2樓R03及L2-027號舖</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../../assets/map/2.jpg')}
                                />
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker> */}
            </MapView>
            <View style={styles.wrap}>
                {/* <Button title="Console" style={styles.mapButton} onPress={() => { console.log("currentRegion:", currentRegion) }} /> */}
                {/* <Button title="Press 0" onPress={() => setCoords()} /> */}
                {/* <Button title="Press"  style={styles.mapButton} onPress={() => getCoords()} /> */}
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 90,
                        height: 70,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: 'rgba(0,0,0, .4)',
                        shadowOffset: { height: 1, width: 1 },
                        shadowOpacity: 1.5,
                        shadowRadius: 3.5,
                    }}
                    onPress={() => getCoords()}
                >
                    <FontAwesomeIcon
                        icon={faLocationArrow}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wrap: {
        flex: 1,
        position: 'absolute',
        right: 1,
        bottom: 1,
        margin: 15
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#FFF',
        borderRadius: 6,
        borderColor: '#CCC',
        borderWidth: 0.5,
        padding: 15,
        width: deviceWidth - 150,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    image: {
        width: deviceWidth - 180,
        height: 100,
        resizeMode: 'cover'
    },
});

const itemData = [
    {
        id: 201,
        tag: "西式",
        name: "Ocio",
        location: "將軍澳坑口重華路8號東港城2樓238號舖",
        coords: "22.316873541377863, 114.26469065357108",
        lat: 22.31687354,
        long: 114.2646907,
        image: require('../../assets/map/201.jpg')
    },
    {
        id: 202,
        tag: "日式",
        name: "壽司郎",
        location: "將軍澳常寧路2號TKO Gateway西翼1樓W101A號舖",
        coords: "22.317479115059154, 114.26441245357108",
        lat: 22.31747912,
        long: 114.2644125,
        image: require('../../assets/map/202.jpg')
    },
    {
        id: 203,
        tag: "中式",
        name: "稻香.茶居",
        location: "將軍澳貿業路8號新都城中心2期2樓2039-2042號舖",
        coords: "22.32362195271674, 114.25815561124182",
        lat: 22.32362195,
        long: 114.2581556,
        image: require('../../assets/map/203.jpg')
    },
    {
        id: 204,
        tag: "西式",
        name: "Yolo",
        location: "將軍澳貿業路8號新都城中心三期1樓132A,138D號舖",
        coords: "22.322685405800385, 114.25685558425378",
        lat: 22.32268541,
        long: 114.2568556,
        image: require('../../assets/map/204.jpg')
    },
    {
        id: 205,
        tag: "西式",
        name: "The Point - Pizza & Pasta ",
        location: "將軍澳唐德街9號將軍澳中心地下G01及G02號舖",
        coords: "22.307955733953175, 114.25806742573812",
        lat: 22.30795573,
        long: 114.2580674,
        image: require('../../assets/map/205.jpg')
    },
    {
        id: 206,
        tag: "日式",
        name: "岩盤牛扒",
        location: "將軍澳唐德街9號將軍澳中心1樓173號舖",
        coords: "22.307693786466682, 114.25727605791477",
        lat: 22.30769379,
        long: 114.2572761,
        image: require('../../assets/map/206.jpg')
    },
    {
        id: 207,
        tag: "中式",
        name: "太興",
        location: "將軍澳調景嶺景嶺路8號都會駅地下GL002號舖",
        coords: "22.305001041589254, 114.25284008766646",
        lat: 22.30500104,
        long: 114.2528401,
        image: require('../../assets/map/207.jpg')
    },
    {
        id: 208,
        tag: "中式",
        name: "新樂園魚蛋粉 ",
        location: "將軍澳調景嶺彩明街1號彩明商場2樓265號舖",
        coords: "22.306263208692368, 114.25140234943615",
        lat: 22.30626321,
        long: 114.2514023,
        image: require('../../assets/map/208.jpg')
    },
    {
        id: 209,
        tag: "西式",
        name: "Steak Together",
        location: "新界粉嶺 新運路33號 粉嶺中心 地下159-160號鋪",
        coords: "22.49117140506103, 114.14148912473776",
        lat: 22.49117141,
        long: 114.1414891,
        image: require('../../assets/map/209.jpg')
    },
    {
        id: 210,
        tag: "泰式",
        name: "船皇",
        location: "新界大埔安邦路8-10號大埔超級城C區第一層539-541號 鋪",
        coords: "22.452762815231694, 114.17131490184727",
        lat: 22.45276282,
        long: 114.1713149,
        image: require('../../assets/map/210.jpg')
    },
    {
        id: 211,
        tag: "中式",
        name: "大圍龍順軒海鮮酒家",
        location: "新界沙田大圍美田邨美田商場二樓201號鋪",
        coords: "22.37649446799465, 114.1707491861016",
        lat: 22.37649447,
        long: 114.1707492,
        image: require('../../assets/map/211.jpg')
    },
    {
        id: 212,
        tag: "泰式",
        name: "喫麵",
        location: "新界荃灣青山道 398 號愉景新城第一層 1016-1018 號 鋪",
        coords: "22.380605104779665, 114.11154627348358",
        lat: 22.3806051,
        long: 114.1115463,
        image: require('../../assets/map/212.jpg')
    },
    {
        id: 213,
        tag: "泰式",
        name: "香葉灣",
        location: "新界葵涌葵昌路51號九龍貿易中心1座2樓S3號鋪",
        coords: "22.36150385836115, 114.13250446356491",
        lat: 22.36150386,
        long: 114.1325045,
        image: require('../../assets/map/213.jpg')
    },
    {
        id: 214,
        tag: "日式",
        name: "Superdon",
        location: "新界大埔大埔超級城B區第一層130-133A號鋪",
        coords: "22.452015363486872, 114.1696547815071",
        lat: 22.45201536,
        long: 114.1696548,
        image: require('../../assets/map/214.jpg')
    },
    {
        id: 215,
        tag: "中式",
        name: "蜀府川鍋 ",
        location: "油塘四山街2號油塘工業大廈3座地下",
        coords: "22.2956382890688, 114.23755846889257",
        lat: 22.29563829,
        long: 114.2375585,
        image: require('../../assets/map/215.jpg')
    },
    {
        id: 216,
        tag: "日式",
        name: "丸亀製麵",
        location: "油塘高超道38號大本型1樓133-134號舖",
        coords: "22.29618803241259, 114.2390029400768",
        lat: 22.29618803,
        long: 114.2390029,
        image: require('../../assets/map/216.jpg')
    },
    {
        id: 217,
        tag: "中式",
        name: "大壹燒鵝",
        location: "藍田啟田道51-67號啟田大廈地下1A, 2-4及6A號舖",
        coords: "22.308882136982998, 114.23408768622369",
        lat: 22.30888214,
        long: 114.2340877,
        image: require('../../assets/map/217.jpg')
    },
    {
        id: 218,
        tag: "泰式",
        name: "珍姐泰國菜館 ",
        location: "藍田匯景道8號匯景商場5樓34-35號舖",
        coords: "22.308100984828062, 114.23308365634139",
        lat: 22.30810098,
        long: 114.2330837,
        image: require('../../assets/map/218.jpg')
    },
    {
        id: 219,
        tag: "西式",
        name: "保家山",
        location: "觀塘開源道60號駱駝漆大廈三座5樓O室",
        coords: "22.310373227692985, 114.22510408425357",
        lat: 22.31037323,
        long: 114.2251041,
        image: require('../../assets/map/219.jpg')
    },
    {
        id: 220,
        tag: "日式",
        name: "相馬日式火鍋",
        location: "觀塘成業街10號電訊一代廣場1樓B2號舖",
        coords: "22.310454597664954, 114.22593361841487",
        lat: 22.3104546,
        long: 114.2259336,
        image: require('../../assets/map/220.jpg')
    },
    {
        id: 221,
        tag: "西式",
        name: "Relish ",
        location: "觀塘鴻圖道63-65號鴻運工業大廈5樓B號舖",
        coords: "22.309964654152274, 114.22326428240625",
        lat: 22.30996465,
        long: 114.2232643,
        image: require('../../assets/map/221.jpg')
    },
    {
        id: 222,
        tag: "日式",
        name: "掌壽司",
        location: "觀塘開源道60號駱駝漆大廈3座5樓U室",
        coords: "22.310204053709715, 114.22525851308903",
        lat: 22.31020405,
        long: 114.2252585,
        image: require('../../assets/map/222.jpg')
    },
    {
        id: 223,
        tag: "西式",
        name: "Non Kitchen ",
        location: "觀塘鴻圖道12精棉工業大廈1樓",
        coords: "22.31391439414713, 114.21852884007706",
        lat: 22.31391439,
        long: 114.2185288,
        image: require('../../assets/map/223.jpg')
    },
    {
        id: 224,
        tag: "泰式",
        name: "亞金南洋茶室",
        location: "牛頭角偉業街133號東九匯1B號舖",
        coords: "22.3141740463697, 114.21786137075964",
        lat: 22.31417405,
        long: 114.2178614,
        image: require('../../assets/map/224.jpg')
    },
    {
        id: 225,
        tag: "中式",
        name: "靠得住粥麵小館",
        location: "九龍灣偉業街33號德福廣場二期5樓520號舖",
        coords: "22.323034916280236, 114.21246945447703",
        lat: 22.32303492,
        long: 114.2124695,
        image: require('../../assets/map/225.jpg')
    },
    {
        id: 226,
        tag: "中式",
        name: "七月餐室",
        location: "九龍灣宏開道19號健力工業大廈地下2B號舖",
        coords: "22.32398181664244, 114.21068747053208",
        lat: 22.32398182,
        long: 114.2106875,
        image: require('../../assets/map/226.jpg')
    },
    {
        id: 227,
        tag: "中式",
        name: "肉浦團",
        location: "九龍旺角通菜街1A-1L號威達商業大廈DELI2 2樓2A舖",
        coords: "22.316297865336516, 114.17101445519489",
        lat: 22.31629787,
        long: 114.1710145,
        image: require('../../assets/map/227.jpg')
    },
    {
        id: 228,
        tag: "西式",
        name: "Season Plus",
        location: "九龍旺角彌敦道733號地下(部份)及地下低層",
        coords: "22.321457408146586, 114.16869009193333",
        lat: 22.32145741,
        long: 114.1686901,
        image: require('../../assets/map/228.jpg')
    },
    {
        id: 229,
        tag: "日式",
        name: "牛陣",
        location: "九龍尖沙咀彌敦道63號國際廣場706號舖",
        coords: "22.29724513274598, 114.17213162638939",
        lat: 22.29724513,
        long: 114.1721316,
        image: require('../../assets/map/229.jpg')
    },
    {
        id: 230,
        tag: "中式",
        name: "新天地美食",
        location: "九龍尖沙咀金巴利道83-85號地下",
        coords: "22.302544007639163, 114.17556015582946",
        lat: 22.30254401,
        long: 114.1755602,
        image: require('../../assets/map/230.jpg')
    },
    {
        id: 231,
        tag: "日式",
        name: "梅光軒",
        location: "杏花邨盛泰道100號杏花新城地下G39B號舖",
        coords: "22.278094430943334, 114.23980007770325",
        lat: 22.27809443,
        long: 114.2398001,
        image: require('../../assets/map/231.jpg')
    },
    {
        id: 232,
        tag: "中式",
        name: "新記雞粥",
        location: "筲箕灣筲箕灣道307號地下及1樓",
        coords: "22.278243018858575, 114.22678418318146",
        lat: 22.27824302,
        long: 114.2267842,
        image: require('../../assets/map/232.jpg')
    },
    {
        id: 233,
        tag: "中式",
        name: "紹華小廚 ",
        location: "筲箕灣愛秩序灣道15號愛秩序灣街市暨綜合服務大樓CF3號舖",
        coords: "22.280465225170328, 114.22717994007681",
        lat: 22.28046523,
        long: 114.2271799,
        image: require('../../assets/map/233.jpg')
    },
    {
        id: 234,
        tag: "中式",
        name: "津津茶餐廳 ",
        location: "北角英皇道774號模範村地下",
        coords: "22.29075591674776, 114.209023168912",
        lat: 22.29075592,
        long: 114.2090232,
        image: require('../../assets/map/234.jpg')
    },
    {
        id: 235,
        tag: "韓式",
        name: "星·韓式小館",
        location: "鰂魚涌海灣街2A號濱海大廈地下A2及A5號舖",
        coords: "22.288373239516613, 114.21149974192399",
        lat: 22.28837324,
        long: 114.2114997,
        image: require('../../assets/map/235.jpg')
    },
    {
        id: 236,
        tag: "西式",
        name: "小城鎮",
        location: "北角明園西街2-6號明苑中心地舖",
        coords: "22.29040748715394, 114.19893047116466",
        lat: 22.29040749,
        long: 114.1989305,
        image: require('../../assets/map/236.jpg')
    },
    {
        id: 237,
        tag: "西式",
        name: "INSANE",
        location: "北角月園街10-16號嘉運大廈地下4號舖",
        coords: "22.291130777672926, 114.19598638465872",
        lat: 22.29113078,
        long: 114.1959864,
        image: require('../../assets/map/237.jpg')
    },
    {
        id: 238,
        tag: "中式",
        name: "八寶清湯腩",
        location: "天后電氣道124號榮華大廈地鋪",
        coords: "22.28566433430696, 114.19161719590001",
        lat: 22.28566433,
        long: 114.1916172,
        image: require('../../assets/map/238.jpg')
    },
    {
        id: 239,
        tag: "韓式",
        name: "喜來稀肉",
        location: "銅鑼灣登龍街41-51號金龍大廈地下3號舖及1樓",
        coords: "22.281344877357864, 114.1824224503484",
        lat: 22.28134488,
        long: 114.1824225,
        image: require('../../assets/map/239.jpg')
    },
    {
        id: 240,
        tag: "日式",
        name: "牛之鍋",
        location: "銅鑼灣堅拿道西10號冠景樓2樓A號舖",
        coords: "22.28223942870466, 114.18026290169591",
        lat: 22.28223943,
        long: 114.1802629,
        image: require('../../assets/map/240.jpg')
    },
    {
        id: 241,
        tag: "西式",
        name: "NINETYs ",
        location: "灣仔皇后大道東222號地下2號舖",
        coords: "22.27555496617389, 114.17260347016399",
        lat: 22.27555497,
        long: 114.1726035,
        image: require('../../assets/map/241.jpg')
    },
    {
        id: 242,
        tag: "中式",
        name: "露面手工拌麵料理",
        location: "灣仔莊士敦道55號地下A號舖",
        coords: "22.276972558949893, 114.17126175357073",
        lat: 22.27697256,
        long: 114.1712618,
        image: require('../../assets/map/242.jpg')
    }
]