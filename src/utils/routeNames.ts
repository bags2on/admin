interface routeNamesMap {
  [name: string]: string
}

const routeNames: routeNamesMap = {
  root: '/',
  auth: '/auth',
  createProduct: '/create-product',
  editProduct: '/edit-product/:id',
  orders: '/orders',
  orderDetails: '/order/',
  communication: '/communication',
  catalog: '/catalog',
  banners: '/banners',
  ui: '/ui'
}

export default routeNames
