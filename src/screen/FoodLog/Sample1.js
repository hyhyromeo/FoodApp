import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacityl, ScrollView } from 'react-native';

export default function Sample1() {
    return (
        <View style={styles.container}>
            <ScrollView style={{width: '80%'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{fontSize:32, textAlign: 'left', marginBottom: 10}}>5大越南Pho推介！灣仔米芝蓮推介名店、旺角區人氣牛柳牛丸粉</Text>
                    <Text style={{fontSize:18, textAlign: 'left'}}>講到pho絕對係最代表越南菜嘅其中一種菜式，湯底主要用牛骨熬製而成，配上河粉、牛肉或雞絲，並佐以生芽菜、香葉、青檸及辣椒一同食用。今次介紹五間喺香港人氣嘅越南pho餐廳畀大家，有連續五年獲得米芝蓮推介嘅名店、旺角區人氣牛柳牛丸粉、和牛湯底、創意越南菜館及越南人主理小店，各有特色。</Text>
                    <Image source={require('../../../assets/foodlog/sample1/1.jpg')} style={{width: deviceWidth - 50, height: 150, margin: 10}}/>
                    <Text style={{fontSize:18, textAlign: 'left', marginBottom: 10}}>旺角超人氣牛柳牛丸粉 越發地道河內料理</Text>
                    <Text style={{fontSize:18, textAlign: 'left'}}>被稱為油尖旺區最好食嘅pho，店舖細細，長期都有條人龍喺門口，到底有咩吸引之處？招牌牛柳牛丸粉，湯底鮮味濃郁，配上炸両、青檸同辣椒，建議將炸兩浸一浸湯先食，會吸收晒湯底嘅香氣。至於配料牛柳同牛丸都係主角，前者有牛味同咬口，都好juicy，同平時坊間食開嘅牛肉片好唔同，牛丸亦非常爽口彈牙。</Text>
                    <Image source={require('../../../assets/foodlog/sample1/2.jpg')} style={{width: deviceWidth - 50, height: 150, margin: 10}}/>
                    <Text style={{fontSize:18, textAlign: 'left', marginBottom: 10}}>講到矜貴一定非呢間主打越式牛肉河嘅餐廳莫屬，招牌春園河嘅湯底係用和牛、牛骨、蔬菜，同草果、丁香、八角等藥材每日以慢火熬煮16個小時而成。配料就有安格斯牛肉、慢煮牛𦟌條同蘿蔔，安格斯板腱牛肉片口感嫩滑，牛𦟌條先用和牛湯慢煮再切條煨煮，好入味而且肉味香濃。蘿蔔粒同樣出色，清甜軟腍帶牛湯底香氣～</Text>
                    <Image source={require('../../../assets/foodlog/sample1/3.jpg')} style={{width: deviceWidth - 50, height: 150, margin: 10}}/>
                    <Text style={{fontSize:18, textAlign: 'left', marginBottom: 10}}>創意越南菜館 pho.dle.bar</Text>
                    <Text style={{fontSize:18, textAlign: 'left'}}>主打創新嘅越南菜館，佢哋嘅pho湯底以多種香料熬製6小時以上而成，味道香濃，配料推介美國安格斯生牛肋片，油脂均勻，半熟粉嫩，肉香都好突出！另外仲有牛腱、美國生牛肉同雞絲扎肉等選擇。幼河粉好滑，掛湯度十足，一入口係滿滿牛香。</Text>
                    <Image source={require('../../../assets/foodlog/sample1/4.jpg')} style={{width: deviceWidth - 50, height: 150, margin: 10}}/>
                    <Text style={{fontSize:18, textAlign: 'left', marginBottom: 10}}>南越特色煮法 Xi Xup</Text>
                    <Text style={{fontSize:18, textAlign: 'left'}}>大圍特色越南小店，招牌生牛牛丸牛腩河粉，餐廳採用南越煮法，湯底會落椰糖調味，味道清甜，飲晒都唔會覺得太鹹。牛肉片嫩滑，牛丸都好重牛味同彈牙。如果鍾意牛香嘅，特別推薦大家加招牌牛骨髓，牛脂味好香濃，口感有啲似肥膏，但唔鍾意肥膏嘅朋友就未必啱啦～</Text>
                    <Image source={require('../../../assets/foodlog/sample1/5.jpg')} style={{width: deviceWidth - 50, height: 150, margin: 10}}/>
                </View>
                
        </ScrollView>
            
        </View>
    )
}


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'Top',
    },
});