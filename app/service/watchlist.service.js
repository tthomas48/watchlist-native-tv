import tokenService from './token.service';
import { LoginError } from './LoginError';

class WatchlistService {
  constructor() {
    this.url = process.env.EXPO_PUBLIC_WATCHLIST_API;
  }
  async authorize() {
    const accessToken = await tokenService.getAccessToken();
    const res = await fetch(`${this.url}/auth/device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: `token=${accessToken}`,
    });
    console.log(res);
    if (res.status == 401) {
      throw new LoginError('watchlist api access has expired')
    }
    if (res.status !== 200) {
      throw `cannot authorize device with watchlist api ${res.status}`;
    }
  }
  async GetLists() {
    try {
      const res = await fetch(`${this.url}/watchlist/lists/`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      console.log(json);
    } catch (e) {
      console.error(e);
    }    
  }
  async GetList(username = "me", listId = "25462957") {
    try {
      console.log('getList');
      const res = await fetch(`${this.url}/watchlist/${username}/${listId}/`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      return json;
    } catch (e) {
      console.error(e);
    }
  }

  GetEditUrl(itemId) {
    return `${this.url}/../watchable/${itemId}`;
  }
  
  async Play(itemId) {
    try {
    console.log(`${this.url}/play/device-googletv/${itemId}/`)
    const res = await fetch(`${this.url}/play/device-googletv/${itemId}/`, {
      method: 'POST',
      credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      const json = await res.json();
      console.log(json);
      return json;
    } catch(e) {
      console.error(e);
    }
  }

}
export default new WatchlistService();