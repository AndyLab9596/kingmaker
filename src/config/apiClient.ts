import { Api, createApiClient } from '@goldfishcode/kingmakerdata-api-sdk';
import { ApiClient } from '@goldfishcode/kingmakerdata-api-sdk/libs/http/client';
import { StorageKeys } from 'src/utils/enum';
import globalVariable from './env';

let apiClient: ApiClient;
let apiIns: Api;

class SessionStorage {
  public async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  public async get(key: string): Promise<string> {
    const value = localStorage.getItem(key);
    return value || '';
  }

  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

const sessionStorage = new SessionStorage();
const config = {
  baseUrl: globalVariable.API_URL,
  authSessionKey: StorageKeys.SESSION_KEY,
  session: sessionStorage,
  socketUrl: globalVariable.SOCKET_URL,
};

const initSDKService = (): void => {
  apiClient = createApiClient(config);
  apiIns = new Api(apiClient);
};

export { initSDKService, apiClient, apiIns };
