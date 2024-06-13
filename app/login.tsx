import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import QRCode from 'react-native-qrcode-svg';
import api from './service/trakt.service';
import tokenService from './service/token.service';

export default function LoginScreen({ navigation }) {
  const [code, setCode] = useState("");
  const [loginUrl, setLoginUrl] = useState("");

  const cancelToken = { cancelled: false };
  const generateCode = () => {
    api.getDeviceCodes().then((p) => {
      console.log(p);
      setCode(p.user_code);
      setLoginUrl(`${p.verification_url}/${p.user_code}`);
      api.pollDevice(p, cancelToken).then((result) => {
        console.log('logged in');
        tokenService.setTokens(result.access_token, result.refresh_token, result.expires_in);
        navigation.navigate('Home');
      }).catch((err) => {
        if (err.message === 'Cancelled') {
          return;
        }
        if (err.message == 'Expired') {
          console.error("Token timed out. Regenerating...")
          generateCode();
          return;
        }
        console.error('Error: ' + err);
      });
    }).catch((err) => {
      console.error('getDeviceCode error');
      console.error(err);
    });
  };

  useFocusEffect(
    useCallback(() => {
      generateCode();
      return () => {
        cancelToken.cancelled = true;
        console.log('This route is now unfocused. Kill off the polling');
      }
    }, [])
  );

  const styles = useLoginScreenStyles();
  const scale = useScale();
  if (code == "" || loginUrl == "") {
    console.log("loading");
    return;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310 * scale}
          name="code-slash"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Login</ThemedText>
      </ThemedView>
      <ThemedText>
        Navigate to the URL below and enter the code on your TV to login.
      </ThemedText>
      <View style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'space-around' }}>
        <ThemedText style={styles.codeText}>
          {code}
        </ThemedText>
        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'flex-end' }}>
          <QRCode value={loginUrl} />
          <ThemedText>Scan Code to Login</ThemedText>
          <ThemedText>{loginUrl}</ThemedText>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const useLoginScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90 * scale,
      left: -35 * scale,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
    codeText: {
      fontSize: 80 * scale,
      lineHeight: 100 * scale,
      textAlign: 'center',
    }
  });
};
