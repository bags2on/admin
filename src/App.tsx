import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import routes from './utils/routeNames'
import { Switch, Route, Redirect } from 'react-router-dom'
import Fallback from './components/Fallback/Fallback'

const UI = lazy(() => import('./pages/UI'))
const CreateProduct = lazy(() => import('./pages/CreateProduct'))
const Orders = lazy(() => import('./pages/Orders'))
const Products = lazy(() => import('./pages/Products'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <AppLayout>
        <Switch>
          <Route exact path={routes.ui} component={UI} />
          <Route path={routes.createProduct} component={CreateProduct} />
          <Route path={routes.orders} component={Orders} />
          <Route path={routes.products} component={Products} />
          <Redirect exact from="/" to={routes.createProduct} />
        </Switch>
      </AppLayout>
    </Suspense>
  )
}

export default App
