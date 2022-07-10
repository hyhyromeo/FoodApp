import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import MapView from "react-native-maps";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Testing Screen</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});