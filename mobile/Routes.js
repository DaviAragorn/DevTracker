import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Stack = createStackNavigator();

function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle:{backgroundColor:'#c40a00'}, headerTintColor:'#FFF', headerTitleAlign: 'center', headerBackTitleVisible: false,}}>
                <Stack.Screen name="Main" component={Main} options={{title:'DevTracker'}}/>
                <Stack.Screen name="Profile" component={Profile} options={{title:'GitHub Profile'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;