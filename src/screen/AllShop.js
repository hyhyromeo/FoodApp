import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as _ from 'lodash';
import Card from '../component/Card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import axios from 'axios';

export default function AllShop() {
  const [search, setSearch] = useState('');
  const [allShopData, setAllShopData] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    await axios
      .get('http://10.1.20.143:3000/allShop')
      .then((res) => {
        setTags(
          _.unionBy(res.data, res.data, 'tag').map((item) => {
            const temp = { label: item.tag, value: item.tag };
            return temp;
          })
        );
        setAllShopData(res.data);
        setFilteredDataSource(res.data);

        return res.data;
      })
      .catch((error) => {
        return error.message;
      });
  };

  const searchFilterFunction = (text) => {
    if (sortValue && text) {
      const newData = allShopData.filter(
        (item) =>
          item.name.toUpperCase().includes(text.toUpperCase()) &&
          item.tag === sortValue
      );
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      if (text) {
        const newData = allShopData.filter((item) => {
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
          setSearch('');
          sortFilterFunction(sortValue);
          setFilteredDataSource(allShopData);
        } else {
          setFilteredDataSource(allShopData);
          setSearch(text);
        }
      }
    }
  };

  const sortFilterFunction = (text) => {
    if (value && text) {
      const newData = allShopData.filter(
        (item) =>
          item.name.toUpperCase().includes(search.toUpperCase()) &&
          item.tag === text
      );
      setFilteredDataSource(newData);
      setSortValue(text);
    } else {
      if (text) {
        const newData = allShopData.filter((item) => {
          const itemData = item.tag ? item.tag.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSortValue(text);
      } else {
        setFilteredDataSource(allShopData);
        setSortValue(text);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.filter}>
          <View style={{ position: 'relative' }}>
            {!search && (
              <FontAwesomeIcon
                style={styles.searchIcon}
                icon={faMagnifyingGlass}
                size={20}
              />
            )}
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => {
                searchFilterFunction(text);
              }}
              value={search}
              underlineColorAndroid="transparent"
              placeholder={`搜尋`}
            />
          </View>

          <View>
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
                overflow: 'visible',
              }}
              onChangeValue={(text) => {
                sortFilterFunction(text);
              }}
              open={open}
              value={value}
              items={tags}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setTags}
            />
          </View>
        </View>

        {allShopData && (
          <FlatList
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            contentContainerStyle={{ paddingBottom: 200 }}
            data={filteredDataSource}
            renderItem={({ item, i }) => {
              return <Card key={i} info={item} />;
            }}
            keyExtractor={(allShopData) => allShopData.id}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
    elevation: 9,
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
    elevation: 9,
  },
  filter: {
    flexDirection: 'row',
    width: deviceWidth - 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 15,
    zIndex: 1,
    right: 12,
    opacity: 0.5,
  },
});
