import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: 'DM Sans',
  heading: 'DM Sans',
};

const colors = {
  brand: {
    main: '#128c7e',
  },
};

const overrides = {
  colors,
  fonts,
};

export default extendTheme(overrides);
