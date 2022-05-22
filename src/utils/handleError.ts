import { message } from 'antd';

const serverError = 'Oops! Something went wrong. Please try again in a bit.';
const networkError = 'Your Internet connection appears to be offline. Please try again later.';
export const handleErrorMessage = (error: any, showMsg = true): string => {
  let msg = '';
  switch (error.statusCode) {
    case 502: {
      msg = serverError;
      break;
    }
    case 'unknown': {
      msg = networkError;
      break;
    }
    default: {
      msg = error.message;
      break;
    }
  }

  if (showMsg) {
    message.error(msg);
  }
  return msg;
};
