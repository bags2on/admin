import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import routes from './utils/routeNames'
import { Switch, Route } from 'react-router-dom'

const UI = lazy(() => import('./pages/UI'))
const CreateProduct = lazy(() => import('./pages/CreateProduct'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading!</p>}>
      <AppLayout>
        <Switch>
          <Route exact path={routes.ui} component={UI} />
          <Route path={routes.createProduct} component={CreateProduct} />
        </Switch>
      </AppLayout>
    </Suspense>
  )
}

export default App
