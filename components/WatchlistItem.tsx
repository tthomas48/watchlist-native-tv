import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import { Text, Card, Layout } from '@ui-kitten/components';
import watchlistService from '../app/service/watchlist.service';
import { startActivityAsync } from 'expo-intent-launcher';
import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '25%',
    height: 250,
    margin: 2,
    padding: 0
  },
  title: {
    padding: 2,
  }
});

const getItemStatus = (item) => {
  if (!item.web_url) {
    return 'warning';
  }
  return 'basic';
};

export function WatchlistItem({ item, index, separators, sound }) {
  const [longPress, setLongPress] = useState<boolean>(false);

  const getCard = () => {
    if (longPress) {
      const editUrl = watchlistService.GetEditUrl(item.id);
      return (
        <Card appearance="filled" status={getItemStatus(item)}>
          <Layout style={styles.poster}>
            <QRCode value={editUrl} size={150} />
          </Layout>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>Edit {item.title}</Text>
        </Card>
      );
    }
    return (
      <Card appearance="filled" status={getItemStatus(item)}>
        <Image
          style={styles.poster}
          source={{
            uri: `${watchlistService.url}/img/${item.id}`,
          }}
        />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
      </Card>
    );
  }

  const playSound = async (item) => {
    if (sound) {
      const status = await sound.playAsync();
    }
  };
  const onPress = async (item) => {
    try {
      setLongPress(false);
      const json = await watchlistService.Play(item.id);
      if (!json.result) {
        throw (json.message);
      }
      var component = json.component;
      var data = json.data;
      await playSound(item);
      await startActivityAsync('android.intent.action.VIEW', { data, packageName: component });
    } catch (e) {
      Alert.alert(`${e}`);
    }
  };
  const onLongPress = async (item) => {
    setLongPress(true);
  };
  const card = getCard();
  return (
    <TouchableHighlight
      activeOpacity={0.7}
      underlayColor="#e5b0a4"
      key={item.key}
      onPress={() => onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
      style={styles.item}
      onBlur={() => setLongPress(false)}
      onLongPress={() => onLongPress(item)}>
      {card}
    </TouchableHighlight>
  );
}