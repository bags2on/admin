import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import Fallback from './components/Fallback/Fallback'
import PrivateRoute from './shared/PrivateRoute'
import { Switch, Route, Redirect } from 'react-router-dom'

const UI = lazy(() => import('./pages/UI'))
const Product = lazy(() => import('./pages/Product'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetails = lazy(() => import('./pages/OrderDetails'))
const Catalog = lazy(() => import('./pages/Catalog'))
const Auth = lazy(() => import('./pages/Auth'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <AppLayout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/order/:orderId" component={OrderDetails} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute key="crete_product" path="/create-product" component={Product} />
          <PrivateRoute key="edit_product" exact path="/edit-product/:id" component={Product} />
          <PrivateRoute path="/catalog/:page?" component={Catalog} />
          <PrivateRoute exact path="/ui" component={UI} />
          <Redirect exact from="/" to="/create-product" />
        </Switch>
      </AppLayout>
    </Suspense>
  )
}

export default App
