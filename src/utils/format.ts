export const currency = {
  USD: '$0,000',
};

export const formatMoney = (money) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(money * 0.01);
};

export const truncateText = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const roundUpNumber = (maxValue: number) => {
  if (maxValue > 10000) {
    return Math.ceil(maxValue / 1000) * 1000;
  }
  if (maxValue > 1000) {
    return Math.ceil(maxValue / 1000) * 1000;
  }
  if (maxValue > 100) {
    return Math.ceil(maxValue / 100) * 100;
  }
};
