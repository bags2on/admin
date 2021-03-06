import React from 'react'
import Grid from '@material-ui/core/Grid'
import Search from './Search/Search'
import Loader from '../../shared/Loader/Loader'
import CatalogItem from '../../components/CatalogItem/CatalogItem'
import { useQuery } from '@apollo/client'
import {
  AllProductsDocument,
  AllProductsQuery,
  AllProductsVariables
} from '../../graphql/product/_gen_/products.query'
import { makeStyles } from '@material-ui/core/styles'
// import { Gender } from '../../types'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 30px 0 30px',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%'
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
}))

const Products: React.FC = () => {
  const classes = useStyles()

  const { loading, data, error } = useQuery<AllProductsQuery, AllProductsVariables>(
    AllProductsDocument,
    {
      variables: { instock: true, gender: [] }
    }
  )

  if (loading) {
    return (
      <div
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Loader fallback />
      </div>
    )
  }

  if (error) {
    return <h1>Access denied</h1>
  }

  console.log(data)

  return (
    <div className={classes.root}>
      <Search />
      <Grid container component="ul" className={classes.list}>
        {data?.allProducts.products.map((product) => (
          <Grid key={product.id} component="li" item xs={6} md={4} lg={3} xl={2}>
            <CatalogItem
              id={product.id}
              hidden={product.isHidden}
              url={product.preview}
              title={product.title}
              basePrice={product.basePrice}
              currentPrice={product.currentPrice}
              mainTag={product.mainTag}
              inStock={product.instock}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Products
