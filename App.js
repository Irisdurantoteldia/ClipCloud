import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import Home from './screens/Home'; 
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import All from './screens/All';
import Feed from './screens/Feed';
import Add from './screens/Add';
import Favorites from './screens/Favorites';
import Account from './screens/Account';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="All" component={All} options={{animation: 'none'}} />
        <Stack.Screen name="Feed" component={Feed} options={{animation: 'none'}} />
        <Stack.Screen name="Add" component={Add} options={{animation: 'none'}} />
        <Stack.Screen name="Favorites" component={Favorites} options={{animation: 'none'}} />
        <Stack.Screen name="Account" component={Account} options={{animation: 'none'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
