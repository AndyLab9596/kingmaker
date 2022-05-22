export const getFlag = (country: string, size = 40) => {
  const flagLinkCND = 'https://flagcdn.com/';

  const sizeW = 'w' + size;
  const countryImg = country.toLowerCase() + '.png';
  return flagLinkCND + sizeW + '/' + countryImg;
};
