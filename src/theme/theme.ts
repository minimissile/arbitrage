import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    body: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
  },
  radii: {
    md: '0.5rem',
    lg: '0.75rem'
  },
  colors: {
    brand: {
      50: '#f2f8ed',
      100: '#e0f0d3',
      200: '#cbe6b6',
      300: '#b3db97',
      400: '#9ccf79',
      500: '#7cba59',
      600: '#66a34a',
      700: '#4f8c3b',
      800: '#3b722c',
      900: '#28501e'
    },
    primary: {
      50: '#f2f8ed',
      100: '#e0f0d3',
      200: '#cbe6b6',
      300: '#b3db97',
      400: '#9ccf79',
      500: '#7cba59',
      600: '#66a34a',
      700: '#4f8c3b',
      800: '#3b722c',
      900: '#28501e'
    }
  }
})

export default theme
