import { parsePhoneNumber, formatNumber, CountryCode, format } from 'libphonenumber-js';
export const formatPhoneUI = (phone: string) => {
  const parse = parsePhoneNumber(phone);
  let phoneNational = formatNumber(phone, 'NATIONAL');
  phoneNational = phoneNational.replace(/[()]/g, '');
  phoneNational = phoneNational.replace(/\s/g, '-');
  return `+${parse.countryCallingCode} ${phoneNational}`;
};

export const formatRequest = (phone: string, country: string) => {
  return format(phone, country as CountryCode, 'E.164');
};

export const parsePhone = (phone: string) => {
  return parsePhoneNumber(phone);
};
