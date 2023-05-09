import {MD3DarkTheme} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/src/types';

const theme: ThemeProp = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
};

export default theme;
