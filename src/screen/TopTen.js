import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, Button, Flexbox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import Card from '../component/Card';

const optionsPerPage = [2, 3, 4];

export default function TopTen() {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [ShowComment, setShowModelComment] = useState(false);
    const [animateModal, setanimateModal] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedRate, setSelectedRate] = useState('');
    const [selectedImage, setSelectedImage] = useState(require('../../assets/icon/placeholder-image.png'));
    const [selectedAddress, setSelectedAddress] = useState('');

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 3 }}><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Name</Text></DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Category</Text></DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Rating</Text></DataTable.Title>
                </DataTable.Header>
                {TopTenData.map((item, key) => (
                    <TouchableOpacity
                        key={key}
                        onPress={() => {
                            setSelectedName(item.name);
                            setSelectedTag(item.tag);
                            setSelectedRate(item.rating);
                            setSelectedImage(item.image);
                            setSelectedAddress(item.location);
                            setShowModelComment(true);
                        }}
                    >
                        <DataTable.Row >
                            <DataTable.Cell style={{ flex: 3 }}>{item.name}</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center' }}>{item.tag}</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center' }}>{item.rating}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))}
            </DataTable>
            <SwipeUpDownModal
                modalVisible={ShowComment}
                PressToanimate={animateModal}
                ContentModal={
                    <View style={styles.containerContent}>
                        <Image source={selectedImage} style={{ width: deviceWidth, height: 220, resizeMode: 'stretch' }} />
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 32, margin: 5, textAlign: 'center' }}>{selectedName}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, margin: 5 }}>類別: {selectedTag}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, margin: 5 }}>地址: {selectedAddress}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, margin: 5 }}>評分: {selectedRate}</Text>
                        </View>
                    </View>
                }
                HeaderStyle={styles.headerContent}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={() => setanimateModal(true)} style={{ width: 60, height: 8, backgroundColor: 'grey', borderRadius: 45 }} />
                    </View>
                }
                onClose={() => {
                    setShowModelComment(false);
                    setanimateModal(false);
                }}
            />
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
    containerContent: {
        flex: 1,
        marginTop: deviceHeight / 2,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    containerHeader: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#F1F1F1',
        marginTop: deviceHeight / 2 - 40,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    headerContent: {
        marginTop: 0,
    },
    Modal: {
        // backgroundColor: '#005252',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: 0,
    }
});

const TopTenData = [
    {
        id: 1,
        tag: '中式',
        name: '嘉潤粥店',
        location: '香港西營盤皇后大道西269-275號地下A號舖',
        rating: 9.5,
        image: require('../../assets/topten/1.jpg')
    },
    {
        id: 2,
        tag: '西式',
        name: 'Steak Together',
        location: '新界粉嶺 新運路33號 粉嶺中心 地下159-160號鋪',
        rating: 9.1,
        image: require('../../assets/topten/2.jpg')
    },
    {
        id: 3,
        tag: '泰式',
        name: '船皇',
        location: '新界大埔安邦路8-10號大埔超級城C區第一層539-541號 鋪',
        rating: 8.8,
        image: require('../../assets/topten/3.jpg')
    },
    {
        id: 4,
        tag: '日式',
        name: '八幡屋涮涮鍋',
        location: '九龍旺角彌敦道628號瓊華中心12樓',
        rating: 8.8,
        image: require('../../assets/topten/4.jpg')
    },
    {
        id: 5,
        tag: '西式',
        name: 'Ruby Tuesday',
        location: '九龍旺角西洋菜南街 51 號友誠商業中心 3 樓',
        rating: 8.7,
        image: require('../../assets/topten/5.jpg')
    },
    {
        id: 6,
        tag: '中式',
        name: '大圍龍順軒海鮮酒家',
        location: '新界沙田大圍美田邨美田商場二樓201號鋪',
        rating: 8.3,
        image: require('../../assets/topten/6.jpg')
    },
    {
        id: 7,
        tag: '西式',
        name: 'Metro Cafe',
        location: '新界馬鞍山保泰街16號WE GO MALL地下G02號鋪',
        rating: 8.2,
        image: require('../../assets/topten/7.jpg')
    },
    {
        id: 8,
        tag: '中式',
        name: '上海弄堂菜肉餛飩',
        location: '香港北角 電氣道63號地下A鋪',
        rating: 8.2,
        image: require('../../assets/topten/8.jpg')
    },
    {
        id: 9,
        tag: '中式',
        name: '顏府御膳',
        location: '香港銅鑼灣開平道1號CUBUS 5樓',
        rating: 7.5,
        image: require('../../assets/topten/9.jpg')
    },
    {
        id: 10,
        tag: '中式',
        name: '軒寧樓',
        location: '香港灣仔軒尼詩道385-391號 軒寧大廈地下1及2號舗',
        rating: 7.4,
        image: require('../../assets/topten/10.jpg')
    }
]