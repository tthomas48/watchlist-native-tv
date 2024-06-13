import { useEffect, useState, ReactElement, Dispatch, SetStateAction, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Image, FlatList, DevSettings, Alert } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, OverflowMenu, IconElement, Divider, Text, Card, Icon, MenuItem } from '@ui-kitten/components';
import { useFocusEffect } from 'expo-router';
import { WatchlistItem } from '../components/WatchlistItem';
import watchlistService from './service/watchlist.service';
import tokenService from './service/token.service';
import { LoginError } from './service/LoginError';

const ListIcon = (): IconElement => (
  <Icon
    name='list-outline'
  />
);

const MenuIcon = (): IconElement => (
  <Icon
    name='more-vertical'
  />
);

const FilterIcon = (): IconElement => (
  <Icon
    name='funnel-outline'
  />
);

const LogoutIcon = (): IconElement => (
  <Icon
    name='log-out'
  />
);

const refreshList = async (navigation, setList : Dispatch<SetStateAction<never[]>>) => {
  try {
    await watchlistService.authorize();
    const list = await watchlistService.GetList();
    setList(list);
  } catch (e) {
    if (e instanceof LoginError) {
      navigation.navigate('Login');
      return;
    }
    Alert.alert(`${e}`);
  }
}

export default function Index({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    // componentDidMount

    // Add our toggle command to the menu
    DevSettings.addMenuItem('Clear access token', () => {
      tokenService.clearTokens();
    });
  }, []);

  useFocusEffect(useCallback(() => {
    refreshList(navigation, setList);
    return () => {
      // do nothing on unfocus
    }
  }, []));


  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const renderRightActions = (): ReactElement => (
    <>
      <TopNavigationAction icon={ListIcon} />
      {/* <TopNavigationAction icon={FilterIcon} />
      <TopNavigationAction icon={LogoutIcon} /> */}
    </>
  );
  

  const renderMenuAction = (): ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={toggleMenu}
    />
  );

  return (
    <SafeAreaView       style={{
      flex: 1,
    }}>
    <TopNavigation title='Watchlist' alignment='center' accessoryRight={renderRightActions} />
    <Divider/>
    <Layout style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
    }}>
      <FlatList
        style={{
          width: '100%',
        }}
        data={list}
        numColumns={4}
        renderItem={WatchlistItem}
        keyExtractor={(item) => `${item.id}.wrapper`}
      />

      {/* {list?.map((item) => (
        <WatchlistItem item={item} key={`${item.id}.wrapper`} />
      ))} */}
    </Layout>
    </SafeAreaView>
  );
}
