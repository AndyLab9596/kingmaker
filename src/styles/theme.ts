// Based on your final design
const layout = {
  minHeight: 940,
  maxWidth: 1440,
  footerHeight: 70,
  headerHeight: 100,
  marginContainer: 24,
  layoutId: 'app-root',
};

const text = {
  blackColor: '#000',
  whiteColor: '#fff',
  errorColor: '#ff0000',
  blueColor: '#1c87c6',
  grayColor: '#818181',
};

const backgroundColor = {
  button: '#2185E8',
  buttonRed: '#B71D21',
  whiteRGBA: (value: number) => `rgba(255, 254, 252, ${value})`,
  grayRGBA: (value: number) => `rgba(227, 227, 227, ${value})`,
};

const textSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xxl: '1.5rem',
  xxxl: '2.5rem',
};

const theme = {
  layout,
  text,
  backgroundColor,
  textSize,
};

export type AppTheme = typeof theme;

export default theme;
