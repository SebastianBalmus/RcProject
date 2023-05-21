import React from 'react';
import {Button, Text, ActivityIndicator, TextInput, Snackbar, SegmentedButtons} from 'react-native-paper';
import {View} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import textValidator from '../validators/textValidator';
import uriValidator from '../validators/uriValidator';
import styleSheet from '../styles/styleSheet';

type RecordType = typeof Ndef.uriRecord | typeof Ndef.textRecord;

const reducer = (state: RecordType, action: string) => {
  if (action === 'text') {
    return Ndef.textRecord;
  } else {
    return Ndef.uriRecord;
  }
};

const WriteNfc: React.FC = () => {
  const [writing, setWriting] = React.useState(false);
  const [content, setContent] = React.useState<string>('');
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [selectedRecordType, setSelectedRecordType] = React.useState<string>('text');
  const [recordType, dispatchRecordType] = React.useReducer(reducer, Ndef.textRecord);

  const writeTag = async () => {
    let validationResult: boolean;

    if (selectedRecordType === 'text') {
      validationResult = await textValidator(content);
    } else {
      validationResult = await uriValidator(content);
      console.log(validationResult);
    }

    if (!validationResult) {
      setStatusMessage(`The ${selectedRecordType} is invalid!`);
      setOpenSnackbar(true);
      return;
    }

    setWriting(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([recordType(content)]);
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

  const cancelWrite = async () => {
    await NfcManager.cancelTechnologyRequest();
    setWriting(false);
  };

  return (
    <View style={styleSheet.wrapper}>
      <Text style={styleSheet.title}>Write NFC</Text>
      <View style={styleSheet.container}>
        {writing && (
          <>
            <ActivityIndicator
              animating
              size="large"
            />
            <Button
              mode="contained"
              uppercase
              onPress={cancelWrite}
              labelStyle={styleSheet.buttonLabel}>
              Cancel
            </Button>
          </>
        )}
        {!writing && (
          <>
            <TextInput
              label="Tag content"
              mode="outlined"
              value={content}
              onChangeText={text => setContent(text)}
              style={styleSheet.field}
            />
            <SegmentedButtons
              buttons={[
                {
                  value: 'text',
                  label: 'Text',
                },
                {
                  value: 'uri',
                  label: 'URI',
                },
              ]}
              value={selectedRecordType}
              onValueChange={(value) => {
                setSelectedRecordType(value);
                dispatchRecordType(value);
              }}
              style={styleSheet.field}
              density="medium"
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
