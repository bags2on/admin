import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import { Switch, Route, Redirect } from 'react-router-dom'
import Fallback from './components/Fallback/Fallback'

const UI = lazy(() => import('./pages/UI'))
const Product = lazy(() => import('./pages/Product'))
const Orders = lazy(() => import('./pages/Orders'))
const Products = lazy(() => import('./pages/Products'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <AppLayout>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/create-product" component={Product} />
          <Route exact path="/edit-product/:id" component={Product} />
          <Route path="/products" component={Products} />
          <Route exact path="/ui" component={UI} />
          <Redirect exact from="/" to="/create-product" />
        </Switch>
      </AppLayout>
    </Suspense>
  )
}

export default App
