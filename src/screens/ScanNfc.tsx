import React from 'react';
import {Button, Text, ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import styleSheet from '../styles/styleSheet';

const ScanNfc: React.FC = () => {
  const [scanning, setScanning] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string>('');

  React.useEffect(() => {
    NfcManager.start();
  });

  const scanTag = async () => {
    setScanning(true);
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();
      console.info('Tag found!', tag);
    } catch (err) {
      console.log('Oops!', err);
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setScanning(false);
    }
  };

  return (
    <View style={styleSheet.wrapper}>
      <Text style={styleSheet.title}>Scan NFC</Text>
      <View style={styleSheet.container}>
        {scanning && <ActivityIndicator animating />}
        {!scanning && (
          <Button
            mode="contained"
            uppercase
            onPress={scanTag}
            labelStyle={styleSheet.buttonLabel}>
            Start scanning
          </Button>
        )}
      </View>
    </View>
  );
};

export default ScanNfc;
