import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter } from 'react-router-dom'
import theme from './utils/theme'
import client from './apollo/apollo'
import App from './App'
import history from './utils/history'
// import reportWebVitals from './reportWebVitals'

const Application: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </HistoryRouter>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<Application />)

// reportWebVitals(console.log)
