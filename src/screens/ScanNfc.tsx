import React from 'react';
import {Button, Text, ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import styleSheet from '../styles/styleSheet';

const ScanNfc: React.FC = () => {
  const [scanning, setScanning] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string | undefined>();

  React.useEffect(() => {
    NfcManager.start();
  });

  const scanTag = async () => {
    setScanning(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag) {
        console.info('Tag found!', tag);
        setContent(Ndef.text.decodePayload(tag.ndefMessage[0].payload as unknown as Uint8Array));
      }
    } catch (err) {
      console.log('Oops!', err);
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setScanning(false);
    }
  }

  const cancelScan = async () => {
    await NfcManager.cancelTechnologyRequest();
    setScanning(false);
  };

  return (
    <View style={styleSheet.wrapper}>
      <Text style={styleSheet.title}>Scan NFC</Text>
      <View style={styleSheet.container}>
        {scanning && (
          <>
            <ActivityIndicator animating />
            <Button
              mode="contained"
              uppercase
              onPress={cancelScan}
              labelStyle={styleSheet.buttonLabel}>
              Cancel
            </Button>
          </>
        )}
        {!scanning && (
          <Button
            mode="contained"
            uppercase
            onPress={scanTag}
            labelStyle={styleSheet.buttonLabel}>
            Start scanning
          </Button>
        )}
        {!scanning && content && (
          <View style={styleSheet.centerTextContainer}>
            <Text style={styleSheet.headingText}>Tag content</Text>
            <Text style={{
              ...styleSheet.emphasizedText,
              ...styleSheet.headingText,
            }}>{content}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScanNfc;
