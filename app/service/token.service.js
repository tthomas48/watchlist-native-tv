import * as SecureStore from 'expo-secure-store';

class TokenService {
  async isLoggedIn() {
    const token = await SecureStore.getItemAsync('access_token');
    return token ? true : false;
  }

  async setTokens(access_token, refresh_token, expires_in) {
    await SecureStore.setItemAsync('access_token', `${access_token}`);
    await SecureStore.setItemAsync('refresh_token', `${refresh_token}`);
    await SecureStore.setItemAsync('expires_in', `${expires_in}`);
  }
  async clearTokens() {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('expires_in');
  }

  async getAccessToken() {
    return await SecureStore.getItemAsync('access_token');
  }
}
export default new TokenService();