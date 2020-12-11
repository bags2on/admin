import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Router } from 'react-router-dom'
import theme from './utils/theme'
import history from './utils/history'
import client from './apollo/client'
import App from './App'
// import reportWebVitals from './reportWebVitals'

const Application = () => {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(
  // <React.StrictMode>
  //   <Router history={history}>
  //     <ThemeProvider theme={theme}>
  //       <ApolloProvider client={client}>
  //         <CssBaseline />
  //         <App />
  //       </ApolloProvider>
  //     </ThemeProvider>
  //   </Router>
  // </React.StrictMode>,
  <Application />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
