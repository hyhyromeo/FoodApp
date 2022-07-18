import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    TextInput,
    Dimensions,
    Flexbox
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as _ from 'lodash';
import Card from '../component/Card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'

export default function AllShop() {

    useEffect(() => {
        setItems(_.unionBy(allItems, allItems, 'tag').map((item) => {
            const temp = { label: item.tag, value: item.tag }
            return temp
        }))
    }, [])

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState(allItems);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [sortValue, setSortValue] = useState(null);
    const [items, setItems] = useState([]);

    const searchFilterFunction = (text) => {
        if (sortValue && text) {
            const newData = allItems.filter((item) => (
                item.name.toUpperCase().includes(text.toUpperCase()) && item.tag === sortValue
            ));
            setFilteredDataSource(newData)
            setSearch(text)
        } else {
            if (text) {
                const newData = allItems.filter(function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setFilteredDataSource(newData);
                setSearch(text);
            } else {
                if (sortValue) {
                    setSearch("");
                    sortFilterFunction(sortValue)
                } else {
                    setFilteredDataSource(allItems);
                    setSearch(text);
                }
            }
        }
    };

    const sortFilterFunction = (text) => {
        if (value && text) {
            const newData = allItems.filter((item) => (
                item.name.toUpperCase().includes(search.toUpperCase()) && item.tag === text
            ));
            setFilteredDataSource(newData)
            setSortValue(text);
        }
        else {
            if (text) {
                const newData = allItems.filter(function (item) {
                    const itemData = item.tag
                        ? item.tag.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setFilteredDataSource(newData);
                setSortValue(text);
            } else {
                setFilteredDataSource(allItems);
                setSortValue(text);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.filter}>
                    <View style={{ position: "relative" }}>
                        {!search && <FontAwesomeIcon
                            style={styles.searchIcon}
                            icon={faMagnifyingGlass}
                            size={20}
                        />}
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(text) => {
                                searchFilterFunction(text)
                            }}
                            value={search}
                            underlineColorAndroid="transparent"
                            placeholder={`搜尋`}
                        />

                    </View>

                    <View style={{
                        zIndex: 1
                    }}>
                        <DropDownPicker
                            style={styles.dropdown}
                            placeholder="分類"
                            dropDownContainerStyle={{
                                width: deviceWidth / 2 - 80,
                                marginHorizontal: 15,
                                marginTop: -10,
                                borderWidth: 0,
                                backgroundColor: '#fff',
                                shadowOpacity: 0.6,
                                shadowRadius: 2,
                                shadowOffset: { width: 3, height: 4 },
                                overflow: "visible"
                            }}
                            onChangeValue={(text) => {
                                sortFilterFunction(text)
                            }}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                    </View>
                </View>

                <FlatList
                    style={{
                        paddingHorizontal: 10,
                        marginTop: 10
                    }}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    data={filteredDataSource}
                    renderItem={({ item, i }) => {
                        return <Card key={i} info={item} />
                    }}
                    keyExtractor={(allItems) => allItems.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView >
    );
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        height: 50,
        width: deviceWidth / 2,
        borderRadius: 10,
        borderWidth: 0,
        paddingLeft: 20,
        backgroundColor: '#fff',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 9
    },
    dropdown: {
        marginTop: -10,
        width: deviceWidth / 2 - 80,
        marginHorizontal: 15,
        height: 40,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 9
    },
    filter: {
        flexDirection: 'row',
        width: deviceWidth - 10,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    searchIcon: {
        position: "absolute",
        bottom: 15,
        zIndex: 1,
        right: 12,
        opacity: 0.5,
    }
});

const allItems = [
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

// const allItems = [
//     {
//         id: 1,
//         tag: '中式',
//         name: '嘉潤粥店',
//         location: '香港西營盤皇后大道西269-275號地下A號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 2,
//         tag: '西式',
//         name: 'Steak Together',
//         location: '新界粉嶺 新運路33號 粉嶺中心 地下159-160號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 3,
//         tag: '泰式',
//         name: '船皇',
//         location: '新界大埔安邦路8-10號大埔超級城C區第一層539-541號 鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 4,
//         tag: '日式',
//         name: '八幡屋涮涮鍋',
//         location: '九龍旺角彌敦道628號瓊華中心12樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 5,
//         tag: '西式',
//         name: 'Ruby Tuesday',
//         location: '九龍旺角西洋菜南街 51 號友誠商業中心 3 樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 6,
//         tag: '中式',
//         name: '大圍龍順軒海鮮酒家',
//         location: '新界沙田大圍美田邨美田商場二樓201號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 7,
//         tag: '西式',
//         name: 'Metro Cafe',
//         location: '新界馬鞍山保泰街16號WE GO MALL地下G02號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 8,
//         tag: '港式',
//         name: '金嫲嫲懷舊冰室',
//         location: '九龍深水埗長沙灣道680號麗新商業中心地下 G55C號單位及1樓155號單位',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 9,
//         tag: '中式',
//         name: '顏府御膳',
//         location: '香港銅鑼灣開平道1號CUBUS 5樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 10,
//         tag: '中式',
//         name: '軒寧樓',
//         location: '香港灣仔軒尼詩道385-391號 軒寧大廈地下1及2號舗',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 11,
//         tag: '西式',
//         name: 'Ama By The Amatricianist',
//         location: '香港灣仔莊士敦道206-212號 208 JOHNSTON 25樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 12,
//         tag: '西式',
//         name: 'The Baker & The Bottleman',
//         location: '香港灣仔皇后大道東200號利東街 地下G14及G15號舖(主部份)及1樓F15A號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 13,
//         tag: '日式',
//         name: 'Mos Burger',
//         location: '香港大嶼山東涌富東街6號富東廣場地下23號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 14,
//         tag: '中式',
//         name: '牡丹軒',
//         location: '香港大嶼山愉景灣愉景廣場(C座)1樓153A鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 15,
//         tag: '中式',
//         name: '書湘門第',
//         location: '香港西環皇后大道西420-422號地下B舖及閣樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 16,
//         tag: '西式',
//         name: 'Phd',
//         location: '新界元朗天水圍天瑞路71, 73, 75 & 77號天澤邨 天澤商場 1樓113A號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 17,
//         tag: '港式',
//         name: '肉浦團',
//         location: '九龍旺角通菜街1A-1L號威達商業大廈DELI2 2樓2A舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 18,
//         tag: '中式',
//         name: '茶居小品',
//         location: '香港太古城太古城道18號太古城中心2樓255號舖檔位2號',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 19,
//         tag: '西式',
//         name: 'Blt Steak',
//         location: '九龍尖沙咀海港城海運大廈地下OT G62號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 20,
//         tag: '港式',
//         name: '正九清湯腩',
//         location: '九龍油麻地文明里11及13號 砵蘭街2及4號 常安樓 地下1號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 21,
//         tag: '日式',
//         name: '九鬼居酒屋',
//         location: '香港銅鑼灣耀華街21號華耀商業大廈地下7號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 22,
//         tag: '日式',
//         name: '真味日本料理',
//         location: '新界荃灣 兆和街23號 海晴軒11號地鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 23,
//         tag: '泰式',
//         name: 'Yummee',
//         location: '新界荃灣青山道 398 號愉景新城第一層 1016-1018 號 鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 24,
//         tag: '泰式',
//         name: '香葉灣',
//         location: '新界葵涌葵昌路51號九龍貿易中心1座2樓S3號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 25,
//         tag: '中式',
//         name: '添好運點心專門店',
//         location: '新界西貢將軍澳 新都城第二期 地下 G03鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 26,
//         tag: '日式',
//         name: 'Sushi Taka Oreryu Tei',
//         location: '九龍觀塘觀塘道418號 創紀之城第5期APM第2層美食廣場G舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 27,
//         tag: '中式',
//         name: 'Grand Majestic Sichuan',
//         location: '香港中環遮打道18號 歷山大廈3樓301號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 28,
//         tag: '港式',
//         name: '幸福小廚',
//         location: '九龍紅磡黃埔新邨民泰街2-32號德民街17-27, 27A-G號永華樓及遠華樓(F及G座)地下D1A及D1B舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 29,
//         tag: '日式',
//         name: 'Superdon',
//         location: '新界大埔大埔超級城B區第一層130-133A號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 30,
//         tag: '港式',
//         name: '連誠大排檔',
//         location: '新界屯門湖翠路1號蝴蝶邨 商業區近第6座C1號熟食檔位',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 31,
//         tag: '西式',
//         name: 'Season Plus',
//         location: '九龍旺角彌敦道733號地下(部份)及地下低層',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 32,
//         tag: '中式',
//         name: '金滿都',
//         location: '新界沙田大涌橋路20-30號河畔花園第一層32號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 33,
//         tag: '西式',
//         name: 'Paisano\'s',
//         location: '九龍尖沙咀加連威老道8號地下',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 34,
//         tag: '西式',
//         name: 'Cafe Imagine',
//         location: '九龍長沙灣道順寧道 338 號豐盛居地下1號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 35,
//         tag: '日式',
//         name: 'Asap',
//         location: '香港銅鑼灣歌頓道1-7A號維峯地下1號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 36,
//         tag: '港式',
//         name: '緣聚',
//         location: '新界荃灣眾安街55號大鴻輝(荃灣)中心3樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 37,
//         tag: '日式',
//         name: '品川日式料理',
//         location: '新界荃灣大河道100號OP MALL 3樓3013號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 38,
//         tag: '西式',
//         name: '121 Bc',
//         location: '香港中環荷李活道49號鴻豐商業中心地下低層',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 39,
//         tag: '中式',
//         name: '琪琪龍蝦泡飯專門店',
//         location: '九龍紅磡民裕街17號隆基大廈A座地下',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 40,
//         tag: '日式',
//         name: 'Mos Burger',
//         location: '香港北角英皇道560號健威坊地下上層U4,U5及U38號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 41,
//         tag: '中式',
//         name: '彩薈軒',
//         location: '九龍尖沙咀彌敦道63號國際廣場25樓2502號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 42,
//         tag: '日式',
//         name: '銀座日本料理鉄板燒',
//         location: '九龍尖沙咀梳士巴利道18號 VICTORIA DOCKSIDE K11 MUSEA ICHK 1層125號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 43,
//         tag: '日式',
//         name: '鮨本',
//         location: '香港銅鑼灣渣甸街66號亨環9樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 44,
//         tag: '西式',
//         name: 'Cin Cin Ristorante',
//         location: '香港銅鑼灣開平道1號 CUBUS 21樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 45,
//         tag: '中式',
//         name: '迦南美食',
//         location: '新界荃灣深井深井村79號地下',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 46,
//         tag: '港式',
//         name: '潮隆泰正宗手打牛丸大王',
//         location: '新界荃灣沙咀道264號廣發大廈地下6號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 47,
//         tag: '西式',
//         name: 'Denim Cafe',
//         location: '新界荃灣青山公路419號地下',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 48,
//         tag: '西式',
//         name: 'Saizeriya Italian Restaurant',
//         location: '新界西貢將軍澳運亨路1號新都城1期商場地下G7及G16-24 號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 49,
//         tag: '中式',
//         name: '巧膳坊',
//         location: '九龍紅磡黃埔花園第8期1樓106-107號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 50,
//         tag: '日式',
//         name: '牛陣',
//         location: '九龍尖沙咀彌敦道63號國際廣場706號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 51,
//         tag: '港式',
//         name: '新天地美食',
//         location: '九龍尖沙咀金巴利道83-85號地下',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 52,
//         tag: '中式',
//         name: '上海弄堂菜肉餛飩',
//         location: '香港北角 電氣道63號地下A鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 53,
//         tag: '中式',
//         name: '東小館',
//         location: '香港灣仔摩理臣山道5-9號天樂廣場1樓',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 54,
//         tag: '港式',
//         name: '稻坊',
//         location: '新界荃灣大壩街4-30號荃灣廣場第6層609-613號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 55,
//         tag: '日式',
//         name: '大戶屋',
//         location: '新界荃灣楊屋道1號荃新天地1樓118號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 56,
//         tag: '西式',
//         name: 'La Postre',
//         location: '新界荃灣大壩街4-30號荃灣廣場地庫第1層B109-B110號 鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 57,
//         tag: '中式',
//         name: 'Eatery Wonder Food',
//         location: '新界西貢將軍澳唐賢街19號天晉匯 2 地下 08 號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 58,
//         tag: '中式',
//         name: '美心．翠園',
//         location: '新界大嶼山赤鱲角香港國際機場一號客運大樓 離港層8字樓(北翼)8T010,8T010A號舖及 7字樓(北號舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 59,
//         tag: '西式',
//         name: 'Paisano\'s',
//         location: '九龍旺角登打士街43H號登打士廣場地下3及5號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 60,
//         tag: '中式',
//         name: '尚點 - 第一城店',
//         location: '新界沙田第一城置富第一城1樓117A號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 61,
//         tag: '港式',
//         name: '清源餐廳',
//         location: '新界沙田圓洲角路15-17號翠麗花園地下16鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 62,
//         tag: '中式',
//         name: '發記腸粉粥品',
//         location: '九龍長沙灣元州街155-163號翠雲大廈地下4號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 63,
//         tag: '日式',
//         name: '瀛燒',
//         location: '新界荃灣享和街5-7號香城大廈地下1號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 64,
//         tag: '西式',
//         name: 'Coffee By Zion',
//         location: '香港西營盤第一街83號 俊景閣地下1-3號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 65,
//         tag: '港式',
//         name: '一號冰室',
//         location: '九龍紅磡必嘉街92-112號紅磡灣中心地下9C舖',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 66,
//         tag: '中式',
//         name: '忠誠盆菜',
//         location: '新界大埔大美督村地下36B號舖 及鋪前的露天茶座',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 67,
//         tag: '港式',
//         name: '太興',
//         location: '香港筲箕灣 寶文街1號 峻峰花園地下 3號B鋪及5號鋪(部份)',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 68,
//         tag: '西式',
//         name: '28 Discovery Cafe',
//         location: '香港北角馬寶道28號華匯中心地下(部份)及地庫(部份)',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 69,
//         tag: '中式',
//         name: '大師傅粥品',
//         location: '新界沙田大圍村南道53,55,61及63號 金昌樓地下D1號鋪',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 70,
//         tag: '日式',
//         name: '喜膳燒',
//         location: '九龍尖沙咀寶勒巷10號地下',
//         image: require('../../assets/rest-happy.jpg')
//     },
//     {
//         id: 71,
//         tag: '西式',
//         name: 'Red Lobster',
//         location: '香港銅鑼灣京士頓街9號FASHION WALK地下K鋪及1樓 部份',
//         image: require('../../assets/rest-happy.jpg')
//     }
// ]