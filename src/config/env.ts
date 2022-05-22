const globalVariable = {
  API_URL: process.env.GATSBY_API_URL || 'https://template-api.dev.goldfishcode.com/v1',
  SOCKET_URL: process.env.GATSBY_SOCKET_URL || 'https://template-ws.dev.goldfishcode.com',
  GOOGLE_SITE_VERIFICATION: process.env.GATSBY_GOOGLE_SITE_VERIFICATION,
  GOOGLE_CLIENT_ID: process.env.GATSBY_GOOGLE_CLIENT_ID || '',
  ARC_GIS: process.env.GATSBY_ARC_GIS,
};
export default globalVariable;
