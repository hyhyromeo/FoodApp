import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import TopTenCard from '../component/TopTenCard';
import * as _ from 'lodash';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faAward } from '@fortawesome/free-solid-svg-icons';
export default function TopTen() {
  const [selectedShop, setSelectedShop] = useState();
  const modalizeRef = useRef(null);
  const { shop } = useContext(ShopContext);
  const [allShopData, setAllShopData] = useState(shop);

  const onOpen = (shopDetail) => {
    setSelectedShop(shopDetail);
    modalizeRef.current?.open();
  };
  return (
    <ScrollView style={styles.container}>
      <DataTable>
        {allShopData &&
          _.take(
            allShopData.sort((a, b) => b.rating - a.rating),
            10
          ).map((item, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                onOpen(item);
              }}
            >
              <DataTable.Row style={{ height: 100 }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: -15,
                    zIndex: 1,
                    // shadowColor: 'rgba(0,0,0, .4)',
                    // shadowOffset: { height: 1, width: 1 },
                    // shadowOpacity: 1.5,
                    // shadowRadius: 3.5,
                  }}
                >
                  <FontAwesomeIcon
                    style={{
                      color: 'lightblue',
                      shadowColor: 'rgba(0,0,0, .4)',
                      shadowOffset: { height: 1, width: 1 },
                      shadowOpacity: 1.5,
                      shadowRadius: 3.5,
                    }}
                    icon={faAward}
                    size={40}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 11,
                      backgroundColor: 'white',
                      fontWeight: 'bold',
                      width: 18,
                      height: 14,
                      textAlign: 'center',
                      shadowColor: 'rgba(0,0,0, .4)',
                      shadowOffset: { height: 1, width: 1 },
                      shadowOpacity: 1.5,
                      shadowRadius: 3.5,
                    }}
                  >
                    {key + 1}
                  </Text>
                </View>
                <DataTable.Cell
                  style={{
                    flex: 3,
                    paddingTop: 10,
                    justifyContent: 'flex-end',
                    position: 'relative',
                  }}
                >
                  <View
                    style={{
                      shadowColor: 'rgba(0,0,0, .4)',
                      shadowOffset: { height: 1, width: 1 },
                      shadowOpacity: 1.5,
                      shadowRadius: 3.5,
                      borderRadius: 15,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: 70,
                        width: 140,
                        resizeMode: 'stretch',
                        borderRadius: 8,
                      }}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cell_name}>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {item.name}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.cat_and_rating}>
                  {item.tag}
                </DataTable.Cell>
                <DataTable.Cell style={styles.cat_and_rating}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <FontAwesomeIcon
                      style={{
                        color: 'lightblue',
                      }}
                      icon={faStar}
                      size={20}
                    />
                    <Text> : {item.rating}</Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
      </DataTable>
      <Modalize modalHeight={deviceHeight - 100} ref={modalizeRef}>
        <TopTenCard shop={selectedShop} />
      </Modalize>
    </ScrollView>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    scrollBehavior: 'smooth',
  },
  cat_and_rating: {
    flex: 1,
  },
  cell_name: {
    flex: 3,
    paddingLeft: 10,
  },
});
