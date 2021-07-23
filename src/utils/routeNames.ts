interface routeNamesMap {
  [name: string]: string
}

const routeNames: routeNamesMap = {
  root: '/',
  createProduct: '/create-product',
  editProduct: '/edit-product/:id',
  orders: '/orders',
  communication: '/communication',
  products: '/products',
  banners: '/banners',
  ui: '/ui'
}

export default routeNames
