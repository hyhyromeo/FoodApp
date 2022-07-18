import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
export default function Sample2() {
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '80%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 32, textAlign: 'left', marginBottom: 10 }}>一年一度！全港4大榴槤放題/自助餐集合</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>榴槤控等足一年，終於又等到榴槤當造嘅時間啦。有酒店、餐廳甚至農莊都趁住呢段時間，推出榴槤放題或自助餐！榴槤控可以放任無限食啦~~</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left' }}>榴槤自助早午餐  唯港薈Silverbox 宴會廳</Text>
                    <Image source={require('../../../assets/foodlog/sample2/1.jpg')} style={{ width: deviceWidth - 50, height: 150, margin: 10 }} />
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>尖沙咀呢間酒店每年都會舉辦榴槤節，今年都唔例外。11場嘅榴槤自助早午餐將會喺7月尾起推出，到時可以一次過試齊5款唔同品種嘅馬來西亞榴槤果肉拼盤，包括有D197貓山王、高山XO等，仲有一款品種係首次引入香港！</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>另外，一如以往，同場有多款榴槤菜式同甜品以自助形式供應，例如避風塘榴槤豆腐、榴槤黃金麥皮蝦、榴槤糯米飯、榴槤芝士撻等，當然唔少得以足料榴槤果蓉製成嘅榴槤雪糕啦。榴槤控唔好錯過喇。</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>榴槤週末下午茶自助餐  大灣咖啡廳</Text>
                    <Image source={require('../../../assets/foodlog/sample2/2.jpg')} style={{ width: deviceWidth - 50, height: 150, margin: 10 }} />
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>紅磡呢間酒店唔止有榴槤晚餐，仲有榴槤下午茶自助餐！晚餐菜式多以榴槤入饌，例如炸榴槤鮮奶、以炭爐明火燒烤嘅榴蓮乞丐雞等，逢星期五六日更會每位成人免費送一份榴槤拼盤，包括貓山皇、紅肉D101、紅蝦或蘇丹王D24等唔同品種。</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>至於首度推出嘅週末下午茶自助餐，則集星、馬、泰、印、越等多國菜於一身，輪流登場嘅榴槤美食有榴槤薄餅、脆炸D24榴槤球 、D101港式榴槤西多士等。千祈唔好漏咗甜品，其中巴斯克蛋糕更加入咗榴槤肉製作呢。</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>90分鐘榴槤放題  貓山農莊</Text>
                    <Image source={require('../../../assets/foodlog/sample2/3.jpg')} style={{ width: deviceWidth - 50, height: 150, margin: 10 }} />
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>今次入西貢，唔食海鮮住喇，去食榴槤放題吖。呢個農莊趁住榴槤季，推出多場馬拉新鮮榴槤即開即食放題，每場限時90分鐘，有約3-5款時令榴槤，款式包括黑金貓山、紅蝦、葫蘆等，另外仲可以食到味道濃郁嘅老樹貓山王同黑刺榴槤等。</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>榴槤放題  Pier 1929</Text>
                    <Image source={require('../../../assets/foodlog/sample2/4.jpg')} style={{ width: deviceWidth - 50, height: 150, margin: 10 }} />
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>灣仔碼頭呢間餐廳則推出2.5小時無限任食馬來西亞榴槤放題，榴槤由彭亨州直送，當中包括貓山王同埋另外4-5款神秘榴槤款式，全部都係樹上熟即時收果，再喺24小時內新鮮空運到港！</Text>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginBottom: 10 }}>放題另包一人一份榴槤鹹甜點、榴槤燉雞湯，鹹甜點包括有D 24 榴槤芝士脆撻、榴槤朱古力、喇沙榴槤蝦多士等，其中最特別嘅可以話係D24榴槤菠蘿油，造型十足十真嘅菠蘿油一樣，以「牛油」其實係Bavarois混入D24榴槤果蓉製成。至於個燉湯，則以雞隻、榴槤白瓤、榴槤果肉等熬3個鐘，味道香濃，滋潤下火。</Text>
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