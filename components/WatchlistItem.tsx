import { StyleSheet, Image, TouchableHighlight, Linking, Alert } from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import watchlistService from '../app/service/watchlist.service';

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: '90%',
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

export function WatchlistItem({ item, index, separators }) {
  const onPress = async (item) => {
    try {
      const json = await watchlistService.Play(item.id);
      if (!json.result) {
        throw(json.message);
      }
      var component = json.component;
      var data = json.data;
      await Linking.sendIntent('android.intent.action.VIEW', [{key: 'data', value: data}, {key: 'component', value: component }]);
    } catch(e) {
      Alert.alert(`${e}`);
    }
  };
   return (
    <TouchableHighlight
      activeOpacity={0.7}
      underlayColor="#e5b0a4"
      key={item.key}
      onPress={() => onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
      style={styles.item}>
    <Card appearance="filled" status={getItemStatus(item)}>
          <Image
            style={styles.poster}
            source={{
              uri: `${watchlistService.url}/img/${item.id}`,
            }}
          />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
        </Card>
        </TouchableHighlight>
   );
}