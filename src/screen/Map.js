import React from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image } from 'react-native';

export default function Map(){
    return(
        <View style={styles.container}>
            <Text>
                Map Screen
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });