import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';

export default function TopTenRankTable(shops, touch) {
  return (
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
      {shops.map((item, key) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            touch();
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
  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  map: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    height: deviceWidth - 150,
    width: deviceWidth - 50,
    borderRadius: 20,
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
    fontWeight: 'bold',
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
    resizeMode: 'cover',
  },
});
