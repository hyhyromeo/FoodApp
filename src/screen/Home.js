import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, TouchableOpacity, Button, Linking, Modal } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { Modalize } from 'react-native-modalize';
import Card from '../component/Card';
import Header from '../component/Header';
import Map from '../screen/Map';

const ads = [
    {
        image: 'https://cdn.pixabay.com/photo/2022/01/03/01/57/airport-6911566_960_720.jpg',
        url: 'https://google.com'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2017/03/23/09/34/artificial-intelligence-2167835_960_720.jpg',
        url: 'https://youtube.com'
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/09/07/10/04/education-1651259_960_720.jpg',
        url: 'https://yahoo.com.hk'

    }
]


const Home = ({ navigation }) => {
    const [url, setUrl] = useState('');
    const [urlOnChange, setUrlOnChange] = useState('');
    const [imgActive, setimgActive] = useState(0);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const sheetRef = useRef(null);

    const modalizeRef = useRef(null);
    const onOpen = (e) => {
        console.log(e);
        setUrl(e);
        modalizeRef.current?.open();
    };

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
                                    source={{ uri: e.image }}
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
            <Modalize modalHeight={800} snapPoint={800} ref={modalizeRef}>
                <WebView

                    source={{ uri: url }}
                    style={{ width: deviceWidth - 10, margin: 10, height: deviceHeight - 150 }}
                    onNavigationStateChange={setUrlOnChange.bind(this)}
                    startInLoadingState={false}
                />

            </Modalize>
            <View style={styles.buttonWrap}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Map', {
                            Lat: location.coords.latitude,
                            Long: location.coords.longitude
                        });
                    }}
                >
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 25, resizeMode: 'contain' }}
                        source={require('../../assets/icon/map.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Top 10')}>
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 25, resizeMode: 'contain' }}
                        source={require('../../assets/icon/crownai.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonWrap}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('All Resturant')}>
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 25, resizeMode: 'contain' }}
                        source={require('../../assets/icon/restaurant.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Food Log')}>
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 25, resizeMode: 'contain' }}
                        source={require('../../assets/icon/fork-logo.png')}
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
        marginTop: 30,
        flexDirection: 'row'
    },
    button: {
        alignItems: 'center',
        width: deviceWidth * 0.4,
        height: deviceHeight * 0.18,
        margin: 10,
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

const allItems = [
    /*{
        id: 1,
        name: 'Happinesssss Plus',
        tag: 'Cafe, Coffee Shop',
        location: 'Shop 1&2, G/F, Island Lodge, 21-23 Kam Hong Street, North Point',
        image: require('../../assets/rest-happy.jpg')
    }*/
    {
        id: 1,
        tag: '中式',
        name: '嘉潤粥店',
        location: '香港西營盤皇后大道西269-275號地下A號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 2,
        tag: '西式',
        name: 'Steak Together',
        location: '新界粉嶺 新運路33號 粉嶺中心 地下159-160號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 3,
        tag: '泰式',
        name: '船皇',
        location: '新界大埔安邦路8-10號大埔超級城C區第一層539-541號 鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 4,
        tag: '日式',
        name: '八幡屋涮涮鍋',
        location: '九龍旺角彌敦道628號瓊華中心12樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 5,
        tag: '西式',
        name: 'Ruby Tuesday',
        location: '九龍旺角西洋菜南街 51 號友誠商業中心 3 樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 6,
        tag: '中式',
        name: '大圍龍順軒海鮮酒家',
        location: '新界沙田大圍美田邨美田商場二樓201號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 7,
        tag: '西式',
        name: 'Metro Cafe',
        location: '新界馬鞍山保泰街16號WE GO MALL地下G02號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 8,
        tag: '港式',
        name: '金嫲嫲懷舊冰室',
        location: '九龍深水埗長沙灣道680號麗新商業中心地下 G55C號單位及1樓155號單位',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 9,
        tag: '中式',
        name: '顏府御膳',
        location: '香港銅鑼灣開平道1號CUBUS 5樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 10,
        tag: '中式',
        name: '軒寧樓',
        location: '香港灣仔軒尼詩道385-391號 軒寧大廈地下1及2號舗',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 11,
        tag: '西式',
        name: 'Ama By The Amatricianist',
        location: '香港灣仔莊士敦道206-212號 208 JOHNSTON 25樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 12,
        tag: '西式',
        name: 'The Baker & The Bottleman',
        location: '香港灣仔皇后大道東200號利東街 地下G14及G15號舖(主部份)及1樓F15A號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 13,
        tag: '日式',
        name: 'Mos Burger',
        location: '香港大嶼山東涌富東街6號富東廣場地下23號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 14,
        tag: '中式',
        name: '牡丹軒',
        location: '香港大嶼山愉景灣愉景廣場(C座)1樓153A鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 15,
        tag: '中式',
        name: '書湘門第',
        location: '香港西環皇后大道西420-422號地下B舖及閣樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 16,
        tag: '西式',
        name: 'Phd',
        location: '新界元朗天水圍天瑞路71, 73, 75 & 77號天澤邨 天澤商場 1樓113A號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 17,
        tag: '港式',
        name: '肉浦團',
        location: '九龍旺角通菜街1A-1L號威達商業大廈DELI2 2樓2A舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 18,
        tag: '中式',
        name: '茶居小品',
        location: '香港太古城太古城道18號太古城中心2樓255號舖檔位2號',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 19,
        tag: '西式',
        name: 'Blt Steak',
        location: '九龍尖沙咀海港城海運大廈地下OT G62號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 20,
        tag: '港式',
        name: '正九清湯腩',
        location: '九龍油麻地文明里11及13號 砵蘭街2及4號 常安樓 地下1號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 21,
        tag: '日式',
        name: '九鬼居酒屋',
        location: '香港銅鑼灣耀華街21號華耀商業大廈地下7號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 22,
        tag: '日式',
        name: '真味日本料理',
        location: '新界荃灣 兆和街23號 海晴軒11號地鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 23,
        tag: '泰式',
        name: 'Yummee',
        location: '新界荃灣青山道 398 號愉景新城第一層 1016-1018 號 鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 24,
        tag: '泰式',
        name: '香葉灣',
        location: '新界葵涌葵昌路51號九龍貿易中心1座2樓S3號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 25,
        tag: '中式',
        name: '添好運點心專門店',
        location: '新界西貢將軍澳 新都城第二期 地下 G03鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 26,
        tag: '日式',
        name: 'Sushi Taka Oreryu Tei',
        location: '九龍觀塘觀塘道418號 創紀之城第5期APM第2層美食廣場G舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 27,
        tag: '中式',
        name: 'Grand Majestic Sichuan',
        location: '香港中環遮打道18號 歷山大廈3樓301號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 28,
        tag: '港式',
        name: '幸福小廚',
        location: '九龍紅磡黃埔新邨民泰街2-32號德民街17-27, 27A-G號永華樓及遠華樓(F及G座)地下D1A及D1B舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 29,
        tag: '日式',
        name: 'Superdon',
        location: '新界大埔大埔超級城B區第一層130-133A號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 30,
        tag: '港式',
        name: '連誠大排檔',
        location: '新界屯門湖翠路1號蝴蝶邨 商業區近第6座C1號熟食檔位',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 31,
        tag: '西式',
        name: 'Season Plus',
        location: '九龍旺角彌敦道733號地下(部份)及地下低層',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 32,
        tag: '中式',
        name: '金滿都',
        location: '新界沙田大涌橋路20-30號河畔花園第一層32號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 33,
        tag: '西式',
        name: 'Paisano\'s',
        location: '九龍尖沙咀加連威老道8號地下',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 34,
        tag: '西式',
        name: 'Cafe Imagine',
        location: '九龍長沙灣道順寧道 338 號豐盛居地下1號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 35,
        tag: '日式',
        name: 'Asap',
        location: '香港銅鑼灣歌頓道1-7A號維峯地下1號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 36,
        tag: '港式',
        name: '緣聚',
        location: '新界荃灣眾安街55號大鴻輝(荃灣)中心3樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 37,
        tag: '日式',
        name: '品川日式料理',
        location: '新界荃灣大河道100號OP MALL 3樓3013號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 38,
        tag: '西式',
        name: '121 Bc',
        location: '香港中環荷李活道49號鴻豐商業中心地下低層',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 39,
        tag: '中式',
        name: '琪琪龍蝦泡飯專門店',
        location: '九龍紅磡民裕街17號隆基大廈A座地下',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 40,
        tag: '日式',
        name: 'Mos Burger',
        location: '香港北角英皇道560號健威坊地下上層U4,U5及U38號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 41,
        tag: '中式',
        name: '彩薈軒',
        location: '九龍尖沙咀彌敦道63號國際廣場25樓2502號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 42,
        tag: '日式',
        name: '銀座日本料理鉄板燒',
        location: '九龍尖沙咀梳士巴利道18號 VICTORIA DOCKSIDE K11 MUSEA ICHK 1層125號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 43,
        tag: '日式',
        name: '鮨本',
        location: '香港銅鑼灣渣甸街66號亨環9樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 44,
        tag: '西式',
        name: 'Cin Cin Ristorante',
        location: '香港銅鑼灣開平道1號 CUBUS 21樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 45,
        tag: '中式',
        name: '迦南美食',
        location: '新界荃灣深井深井村79號地下',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 46,
        tag: '港式',
        name: '潮隆泰正宗手打牛丸大王',
        location: '新界荃灣沙咀道264號廣發大廈地下6號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 47,
        tag: '西式',
        name: 'Denim Cafe',
        location: '新界荃灣青山公路419號地下',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 48,
        tag: '西式',
        name: 'Saizeriya Italian Restaurant',
        location: '新界西貢將軍澳運亨路1號新都城1期商場地下G7及G16-24 號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 49,
        tag: '中式',
        name: '巧膳坊',
        location: '九龍紅磡黃埔花園第8期1樓106-107號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 50,
        tag: '日式',
        name: '牛陣',
        location: '九龍尖沙咀彌敦道63號國際廣場706號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 51,
        tag: '港式',
        name: '新天地美食',
        location: '九龍尖沙咀金巴利道83-85號地下',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 52,
        tag: '中式',
        name: '上海弄堂菜肉餛飩',
        location: '香港北角 電氣道63號地下A鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 53,
        tag: '中式',
        name: '東小館',
        location: '香港灣仔摩理臣山道5-9號天樂廣場1樓',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 54,
        tag: '港式',
        name: '稻坊',
        location: '新界荃灣大壩街4-30號荃灣廣場第6層609-613號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 55,
        tag: '日式',
        name: '大戶屋',
        location: '新界荃灣楊屋道1號荃新天地1樓118號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 56,
        tag: '西式',
        name: 'La Postre',
        location: '新界荃灣大壩街4-30號荃灣廣場地庫第1層B109-B110號 鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 57,
        tag: '中式',
        name: 'Eatery Wonder Food',
        location: '新界西貢將軍澳唐賢街19號天晉匯 2 地下 08 號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 58,
        tag: '中式',
        name: '美心．翠園',
        location: '新界大嶼山赤鱲角香港國際機場一號客運大樓 離港層8字樓(北翼)8T010,8T010A號舖及 7字樓(北號舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 59,
        tag: '西式',
        name: 'Paisano\'s',
        location: '九龍旺角登打士街43H號登打士廣場地下3及5號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 60,
        tag: '中式',
        name: '尚點 - 第一城店',
        location: '新界沙田第一城置富第一城1樓117A號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 61,
        tag: '港式',
        name: '清源餐廳',
        location: '新界沙田圓洲角路15-17號翠麗花園地下16鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 62,
        tag: '中式',
        name: '發記腸粉粥品',
        location: '九龍長沙灣元州街155-163號翠雲大廈地下4號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 63,
        tag: '日式',
        name: '瀛燒',
        location: '新界荃灣享和街5-7號香城大廈地下1號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 64,
        tag: '西式',
        name: 'Coffee By Zion',
        location: '香港西營盤第一街83號 俊景閣地下1-3號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 65,
        tag: '港式',
        name: '一號冰室',
        location: '九龍紅磡必嘉街92-112號紅磡灣中心地下9C舖',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 66,
        tag: '中式',
        name: '忠誠盆菜',
        location: '新界大埔大美督村地下36B號舖 及鋪前的露天茶座',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 67,
        tag: '港式',
        name: '太興',
        location: '香港筲箕灣 寶文街1號 峻峰花園地下 3號B鋪及5號鋪(部份)',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 68,
        tag: '西式',
        name: '28 Discovery Cafe',
        location: '香港北角馬寶道28號華匯中心地下(部份)及地庫(部份)',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 69,
        tag: '中式',
        name: '大師傅粥品',
        location: '新界沙田大圍村南道53,55,61及63號 金昌樓地下D1號鋪',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 70,
        tag: '日式',
        name: '喜膳燒',
        location: '九龍尖沙咀寶勒巷10號地下',
        image: require('../../assets/rest-happy.jpg')
    },
    {
        id: 71,
        tag: '西式',
        name: 'Red Lobster',
        location: '香港銅鑼灣京士頓街9號FASHION WALK地下K鋪及1樓 部份',
        image: require('../../assets/rest-happy.jpg')
    }
]

export default Home;