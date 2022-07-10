import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screen/Home';
import Map from '../screen/Map';
import TopTen from '../screen/TopTen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Map" component={Map}/>
        </Tab.Navigator>
    );
}

export default Tabs;