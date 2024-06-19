import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry  } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '@/components/Navigation';
import theme from '@/constants/theme.json';

export default function RootLayout() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <AppNavigator/>
      </ApplicationProvider>
    </>
  );
}
