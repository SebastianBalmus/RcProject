import React from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import styleSheet from '../styles/styleSheet';

const About: React.FC = () => (
  <View style={styleSheet.wrapper}>
    <Text style={styleSheet.title}>About</Text>
    <View style={styleSheet.paragraphContainer}>
      <Text style={styleSheet.paragraph}>
        This application was created for the{' '}
        <Text style={styleSheet.emphasizedText}>Radiocommunications</Text>{' '}
        project in the university year 2022-2023. Its purpose is reading and
        writing NFC tags using the Ndef technology. It was built using React
        Native and TypeScript.
      </Text>
    </View>
    <View style={styleSheet.footer}>
      <Text>Made with ❤️ by Sebastian Balmus</Text>
    </View>
  </View>
);

export default About;
