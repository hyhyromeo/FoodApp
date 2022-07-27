import React, { useState, useEffect, useContext } from 'react';
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
import { ShopContext } from '../../context/ShopContext';

export default function AllShop() {
  const { shop } = useContext(ShopContext);
  const [search, setSearch] = useState('');
  const [allShopData, setAllShopData] = useState(shop);
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setTags(
      _.unionBy(shop, shop, 'tag').map((item) => {
        const temp = { label: item.tag, value: item.tag };
        return temp;
      })
    );
    setAllShopData(shop);
    setFilteredDataSource(shop);
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
    <View style={styles.container}>
      <View style={styles.filter}>
        <View style={styles.searchWrap}>
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
        <View
          style={{
            width: '30%',
          }}
        >
          <DropDownPicker
            style={styles.dropdown}
            placeholder="分類"
            dropDownContainerStyle={styles.dropDownContainer}
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
  );
}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    position: 'relative',
    width: '65%',
    marginRight: 15,
  },
  textInputStyle: {
    height: 50,
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
    height: 40,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 9,
  },
  dropDownContainer: {
    marginTop: -10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#fff',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: { width: 3, height: 4 },
    overflow: 'visible',
  },
  filter: {
    flexDirection: 'row',
    width: deviceWidth - 20,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 15,
    zIndex: 1,
    right: 12,
    opacity: 0.5,
  },
});
