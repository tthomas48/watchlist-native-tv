import Trakt from './trakt';

class TraktService {
  constructor() {
    this.trakt = new Trakt({
      client_id: process.env.EXPO_PUBLIC_TRAKT_CLIENT_ID,
      client_secret: process.env.EXPO_PUBLIC_TRAKT_CLIENT_SECRET,
      redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
      debug: true,
    });
  }
  async getDeviceCodes() {
    return this.trakt.get_codes();
  }
  async pollDevice(poll, cancelToken) {
    return await this.trakt.poll_access(poll, cancelToken);
  }
}
export default new TraktService();