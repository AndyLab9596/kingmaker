import { SocketIO } from '@goldfishcode/kingmakerdata-api-sdk';

export interface SocketState {
  connected: boolean;
  joined: boolean;
  webSocket: SocketIO | null;
  disconnected: boolean;
}
