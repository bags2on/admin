import React from 'react'
import CatalogItem from '../../../components/CatalogItem/CatalogItem'
import Grid from '@material-ui/core/Grid'
import { CartItemType, MainTag } from '../../../types'
import { makeStyles } from '@material-ui/core/styles'

interface orderProduct {
  id: string
  title: string
  preview: string
  instock: boolean
  mainTag: MainTag
  currentPrice: number
  basePrice: number
}

interface PreviewListProps {
  cartItems: CartItemType[] | undefined
  products: orderProduct[] | undefined
}

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 10,
    paddingTop: 10
  },
  listTitle: {
    margin: 0,
    marginBottom: 10
  },
  list: {
    margin: 0,
    padding: '5px 10px',
    listStyle: 'none',
    backgroundColor: '#3c3c3c',
    borderRadius: 15,
    minHeight: 555
  }
}))

const PreviewList: React.FC<PreviewListProps> = ({ cartItems, products }) => {
  const classes = useStyles()

  const idMap = new Map()

  cartItems?.map((item) => {
    idMap.set(item.id, item.amount)
  })

  return (
    <section className={classes.root}>
      <h1 className={classes.listTitle}>Список товаров:</h1>
      <Grid container component="ul" className={classes.list}>
        {products &&
          products.map((product) => (
            <Grid key={product.id} component="li" item xs={4}>
              <CatalogItem
                id={product.id}
                url={product.preview}
                title={product.title}
                basePrice={product.basePrice}
                currentPrice={product.currentPrice}
                mainTag={product.mainTag}
                inStock={product.instock}
                hideControls
              />
            </Grid>
          ))}
      </Grid>
    </section>
  )
}

export default PreviewList
