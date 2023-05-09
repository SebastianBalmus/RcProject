import React from 'react';
import {Button, Text, ActivityIndicator, TextInput} from 'react-native-paper';
import {View} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import styleSheet from '../styles/styleSheet';

const WriteNfc: React.FC = () => {
  const [writing, setWriting] = React.useState(false);
  const [content, setContent] = React.useState<string>('');

  const writeTag = async () => {
    setWriting(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(content)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
      }
    } catch (err) {
      console.log('Oops!', err);
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setWriting(false);
    }
  };

  return (
    <View style={styleSheet.wrapper}>
      <Text style={styleSheet.title}>Write NFC</Text>
      <View style={styleSheet.container}>
        {writing && <ActivityIndicator animating />}
        {!writing && (
          <>
            <TextInput
              label="Tag content"
              mode="outlined"
              value={content}
              onChangeText={text => setContent(text)}
              style={styleSheet.textField}
            />
            <Button
              mode="contained"
              uppercase
              onPress={writeTag}
              labelStyle={styleSheet.buttonLabel}>
              Write tag
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default WriteNfc;
