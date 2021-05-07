import React from 'react'
import Search from './Search/Search'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 30px 0 30px',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%'
  }
}))

const Products: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Search />
      <h1>Products</h1>
    </div>
  )
}

export default Products
