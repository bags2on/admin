import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import routes from './utils/routeNames'
import { Switch, Route } from 'react-router-dom'

const UI = lazy(() => import('./pages/UI'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading!</p>}>
      <AppLayout>
        <Switch>
          <Route path={routes.catalog} component={UI} />
        </Switch>
      </AppLayout>
    </Suspense>
  )
}

export default App
