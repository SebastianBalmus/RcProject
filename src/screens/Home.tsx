import React from 'react';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';
import styleSheet from '../styles/styleSheet';

// @ts-ignore
const Home: React.FC = ({navigation}) => {
  const scanNfc = () => navigation.navigate('ScanNfc');
  const writeNfc = () => navigation.navigate('WriteNfc');
  const about = () => navigation.navigate('About');

  return (
    <View style={styleSheet.wrapper}>
      <Text style={styleSheet.title}>NFC App</Text>
      <View style={styleSheet.container}>
        <Button
          mode="contained"
          uppercase={true}
          onPress={scanNfc}
          labelStyle={styleSheet.buttonLabel}>
          Scan NFC
        </Button>
        <Button
          mode="contained"
          uppercase={true}
          onPress={writeNfc}
          labelStyle={styleSheet.buttonLabel}>
          Write NFC
        </Button>
        <Button
          mode="contained"
          uppercase={true}
          onPress={about}
          labelStyle={styleSheet.buttonLabel}>
          About
        </Button>
      </View>
    </View>
  );
};

export default Home;
