import { Image, StyleSheet, Platform } from 'react-native';
import { useScale } from '@/hooks/useScale';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import theme from '@/constants/theme.json';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <Text>Hi</Text>
    </ApplicationProvider>
  );
}

const useHomeScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
    },
    reactLogo: {
      height: 178 * scale,
      width: 290 * scale,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
};
