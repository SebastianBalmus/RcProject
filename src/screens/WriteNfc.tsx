import React from 'react';
import {Button, Text, ActivityIndicator, TextInput, Snackbar} from 'react-native-paper';
import {View} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import styleSheet from '../styles/styleSheet';

const WriteNfc: React.FC = () => {
  const [writing, setWriting] = React.useState(false);
  const [content, setContent] = React.useState<string>('');
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  const writeTag = async () => {
    if (content.length < 1) {
      setStatusMessage('No text provided!');
      setOpenSnackbar(true);
      return;
    }
    setWriting(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(content)]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
      }
      setStatusMessage('Success!');
    } catch (err) {
      console.log('Oops!', err);
      setStatusMessage('Something went wrong!');
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setWriting(false);
      setOpenSnackbar(true);
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
      <Snackbar
        visible={openSnackbar}
        onDismiss={() => setOpenSnackbar(false)}>
        {statusMessage}
      </Snackbar>
    </View>
  );
};

export default WriteNfc;
