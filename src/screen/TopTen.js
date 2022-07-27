import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import TopTenCard from '../component/TopTenCard';
import * as _ from 'lodash';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.rank}>
            <Text style={styles.title}>Rank</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.name}>
            <Text style={styles.title}>Name</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cat_and_rating}>
            <Text style={styles.title}>Category</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.cat_and_rating}>
            <Text style={styles.title}>Rating</Text>
          </DataTable.Title>
        </DataTable.Header>
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
              <DataTable.Row>
                <DataTable.Cell style={styles.rank}>{key + 1}</DataTable.Cell>
                <DataTable.Cell style={styles.cell_name}>
                  {item.name}
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
      <Modalize
        modalHeight={deviceHeight * 0.78}
        snapPoint={deviceHeight * 0.78}
        ref={modalizeRef}
      >
        <TopTenCard shop={selectedShop} />
      </Modalize>
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  rank: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    flex: 3,
    paddingLeft: 10,
  },
  cat_and_rating: {
    justifyContent: 'center',
  },
  cell_name: {
    flex: 3,
    paddingLeft: 10,
  },
});
