import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider as MuITheme } from '@material-ui/core'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import theme, { styledTheme, GlobalStyles } from './utils/theme'
import client from './apollo/apollo'
import App from './App'
import history from './utils/history'
import { ThemeProvider } from 'styled-components'
// import reportWebVitals from './reportWebVitals'

import 'normalize.css'

const Application: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <ThemeProvider theme={styledTheme}>
        <MuITheme theme={theme}>
          <ApolloProvider client={client}>
            {/* TODO: remove CssBaseline after MUI */}
            <CssBaseline />
            <GlobalStyles />
            <App />
          </ApolloProvider>
        </MuITheme>
      </ThemeProvider>
    </HistoryRouter>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Application />)
// reportWebVitals(console.log)
