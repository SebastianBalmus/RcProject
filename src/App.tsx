import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './styles/theme';
import Home from './screens/Home';
import ScanNfc from './screens/ScanNfc';
import WriteNfc from './screens/WriteNfc';
import About from './screens/About';

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScanNfc"
          component={ScanNfc}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WriteNfc"
          component={WriteNfc}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

export default App;
