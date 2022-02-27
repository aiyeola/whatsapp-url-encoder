import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  body: 'DM Sans',
  heading: 'DM Sans',
};

const colors = {
  brand: {
    main: '#99154E',
    body: '#37474F',
    secondary: '#FFC93C',
    secondary2: 'rgba(255, 201, 60, 0.2)',
    optional1: '#FFDDCC',
    optional2: 'rgba(255, 187, 204, 0.2)',
    text: '#E9F7FE',
    ash: '#F4F5F7',
    textGray: '#969BAB',
  },
};

const breakpoints = createBreakpoints({
  base: '0px',
  sm: '321px',
  md: '600px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1920px',
});

const overrides = {
  colors,
  fonts,
  breakpoints,
};

export default extendTheme(overrides);
