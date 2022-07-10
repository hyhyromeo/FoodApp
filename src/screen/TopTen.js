import React from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image } from 'react-native';
import Card from '../component/Card';

export default function TopTen(){
    return(
        <View style={styles.container}>
            <FlatList 
                data={TopTenData} 
                renderItem={({item}) => {
                    return <Card info={item} />
                }}
                keyExtractor={(TopTenData) => TopTenData.id.toString()}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
  });

  const TopTenData = [
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
    }
]