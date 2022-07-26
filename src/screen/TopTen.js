import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import axios from 'axios';
import TopTenCard from '../component/TopTenCard';
import * as _ from 'lodash';

const optionsPerPage = [2, 3, 4];

export default function TopTen() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [selectedShop, setSelectedShop] = useState();
  const modalizeRef = useRef(null);
  const [allShopData, setAllShopData] = useState();

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    await axios
      .get('http://10.1.20.143:3000/allShop')
      .then((res) => {
        setAllShopData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const onOpen = (shopDetail) => {
    setSelectedShop(shopDetail);
    modalizeRef.current?.open();
  };
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title}>Rank</Text>
          </DataTable.Title>
          <DataTable.Title style={{ flex: 3, paddingLeft: 10 }}>
            <Text style={styles.title}>Name</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center' }}>
            <Text style={styles.title}>Category</Text>
          </DataTable.Title>
          <DataTable.Title style={{ justifyContent: 'center' }}>
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
                <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
                  {key + 1}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 3, paddingLeft: 10 }}>
                  {item.name}
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>
                  {item.tag}
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>
                  {item.rating}
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
