import React, { lazy, Suspense } from 'react'
import AppLayout from './components/AppLayout/AppLayout'
import Fallback from './components/Fallback/Fallback'
import PrivateRoute from './shared/PrivateRoute'
import { Routes, Route, Navigate } from 'react-router-dom'

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
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/create-product" element={<Product />} />
            <Route path="/edit-product/:id" element={<Product />} />
            <Route path="/orders" element={<Orders />}>
              <Route path=":orderId" element={<OrderDetails />} />
            </Route>
            <Route path="/catalog" element={<Catalog />}>
              <Route path=":page" element={<Catalog />} />
            </Route>
          </Route>
          <Route path="/ui" element={<UI />} />
          <Route path="*" element={<Navigate to="/orders" />} />
        </Routes>
      </AppLayout>
    </Suspense>
  )
}

export default App
