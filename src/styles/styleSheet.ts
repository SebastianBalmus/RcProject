import {StyleSheet} from 'react-native';
import theme from './theme';

const styleSheet = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 40,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '40%',
    width: '100%',
    gap: 30,
  },
  paragraphContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '40%',
    width: '70%',
  },
  footer: {
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: 15,
  },
  textField: {
    width: '80%',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'justify',
  },
  emphasizedText: {
    color: theme.colors?.primary,
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 20,
  },
  centerTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styleSheet;
