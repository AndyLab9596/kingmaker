import { SocketEventName, SocketIO } from '@goldfishcode/kingmakerdata-api-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { EventChannel, eventChannel, Subscribe } from 'redux-saga';
import { apiClient } from 'src/config/apiClient';
import SocketAction from './action';

const ws = SocketIO.instance();

const connectSocket = (): EventChannel<unknown> => {
  const subscriber: Subscribe<unknown> = (emitEvent: (input: PayloadAction<any>) => void) => {
    const config = apiClient.getApiConfig();
    apiClient.getAuthToken().then((session) => {
      const socketUrl = config.socketUrl || '';

      if (!session || !socketUrl) {
        ws.disconnect();
        return () => {
          ws.close();
        };
      }

      if (!ws.isConnected()) {
        // ws.connect(socketUrl, session?.access_token);
      }

      ws.on(SocketEventName.Unauthorized, (e) => {
        console.info('Socket is unauthorized: ', e);
      });

      ws.on(SocketEventName.Connect, () => {
        console.info('Socket is connected!');
      });

      ws.on(SocketEventName.Disconnect, (e) => {
        console.info('Socket is disconnected: ', e);
        emitEvent({
          type: SocketAction.SOCKET_DISCONNECT,
          payload: true,
        });
      });

      ws.on(SocketEventName.Close, (e) => {
        console.info('Socket is closed ', e);
      });

      ws.on(SocketEventName.Error, (e) => {
        console.info('Socket returns an error: ', e);
      });

      ws.on(SocketEventName.Join, (e) => {
        console.info('Socket is joined: ', e);
        emitEvent({
          type: SocketAction.USER_JOINED_SOCKET,
          payload: ws,
        });
      });

      ws.on(SocketEventName.Userstate, (e) => {
        console.info('User state is changed: ', e);
      });
    });

    return () => {
      ws.close();
    };
  };
  return eventChannel<unknown>(subscriber);
};

export default connectSocket;
