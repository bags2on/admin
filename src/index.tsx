import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { Router } from 'react-router-dom'
// import theme from './utils/theme'
import history from './utils/history'
import client from './apollo/apollo'
import App from './App'
// import reportWebVitals from './reportWebVitals'

const Application: React.FC = () => {
  return (
    <Router history={history}>
      {/* <ThemeProvider theme={theme}> */}
      <ApolloProvider client={client}>
        <CssBaseline />
        <App />
      </ApolloProvider>
      {/* </ThemeProvider> */}
    </Router>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<Application />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
