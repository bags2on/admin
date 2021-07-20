interface routeNamesMap {
  [name: string]: string
}

const routeNames: routeNamesMap = {
  root: '/',
  createProduct: '/create-product',
  orders: '/orders',
  communication: '/communication',
  products: '/products', //
  banners: '/banners',
  product: '/p/:id', //
  ui: '/ui'
}

export default routeNames
