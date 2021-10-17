import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import { Switch, Route, Redirect } from 'react-router-dom'
import Fallback from './components/Fallback/Fallback'

const UI = lazy(() => import('./pages/UI'))
const Product = lazy(() => import('./pages/Product'))
const Orders = lazy(() => import('./pages/Orders'))
const Catalog = lazy(() => import('./pages/Catalog'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <AppLayout>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route key="crete_product" path="/create-product" component={Product} />
          <Route key="edit_product" exact path="/edit-product/:id" component={Product} />
          <Route path="/catalog" component={Catalog} />
          <Route exact path="/ui" component={UI} />
          <Redirect exact from="/" to="/create-product" />
        </Switch>
      </AppLayout>
    </Suspense>
  )
}

export default App
