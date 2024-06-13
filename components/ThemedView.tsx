import { View, type ViewProps } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import theme from '@/constants/theme.json';
export function ThemedView({  ...otherProps }) {

  return <ApplicationProvider {...eva} theme={theme} {...otherProps} />;
}
