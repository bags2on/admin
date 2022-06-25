import { createTheme } from '@material-ui/core/styles'
import { BreakpointOverrides } from '@material-ui/core/styles/createBreakpoints'

import { createGlobalStyle } from 'styled-components'

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    tablet: true
    laptop: true
    desktop: true
  }
}

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width']
      breakpoint: BreakpointOverrides
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
      breakpoint?: BreakpointOverrides
    }
  }
}

export default createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', 'tablet', 'laptop', 'desktop'],
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
      tablet: 800,
      laptop: 1000,
      desktop: 1400
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#F2E30C'
    },
    secondary: {
      main: '#F2E30C'
    },
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          position: 'relative',
          height: '100%',
          overflowY: 'hidden'
        }
      }
    },
    MuiBackdrop: {
      root: {
        backdropFilter: 'blur(3px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }
    }
  }
})

export interface ITheme {
  colors: {
    primary: string
  }

  breakpoints: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    tablet: number
    laptop: number
    desktop: number
  }
}

export const styledTheme: ITheme = {
  colors: {
    primary: '#F2E30C'
  },
  breakpoints: {
    xs: 0,
    sm: 450,
    md: 600,
    lg: 900,
    xl: 1200,
    tablet: 800,
    laptop: 1000,
    desktop: 1400
  }
}

export const GlobalStyles = createGlobalStyle`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`
