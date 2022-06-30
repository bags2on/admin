import React from 'react'
import Button from '../../../shared/Button'
import CatalogItem from '../../../components/CatalogItem/CatalogItem'
import Pagination from '../../../components/Pagination/Pagination'
import ExpandedGrid from '../../../shared/ExpandedGrid'
import routeNames from '../../../utils/routeNames'
import { makeStyles } from '@material-ui/core'
import styled from 'styled-components'

interface ProductsProps {
  totalPages: number
  currentPage: number
  products:
    | Array<{
        id: string
        title: string
        instock: boolean
        currentPrice: number
        basePrice: number
        isHidden: boolean
        mainTag: string
        preview: string
      }>
    | undefined
  onActionButtonClick(): void
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    paddingBottom: 47,
    [theme.breakpoints.up('lg')]: {
      paddingBottom: 67
    }
  },
  list: {
    margin: 0,
    padding: 5,
    listStyle: 'none'
  },
  notFoundBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100 * var(--vh))',
    [theme.breakpoints.up('lg')]: {
      height: '100%'
    }
  },
  text: {
    fontSize: 17,
    fontWeight: 500,
    textAlign: 'center',
    width: 270,
    margin: 0,
    marginBottom: 10
  },
  smile: {
    fontSize: 35,
    fontWeight: 500,
    textAlign: 'center',
    margin: 0
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    [theme.breakpoints.up('lg')]: {
      bottom: 15
    }
  }
}))

const ShowAllButton = styled(Button)`
  && {
    display: block;
    width: 200px;
    padding: 15px 10px;
    margin: 0 auto;
    background-color: var(--green);
    &:hover {
      background-color: var(--green-light);
    }
  }
`

const Products: React.FC<ProductsProps> = ({
  totalPages,
  currentPage,
  products,
  onActionButtonClick
}) => {
  const classes = useStyles()

  if (products === undefined) return null

  if (!products.length) {
    return (
      <div className={classes.notFoundBox}>
        <div>
          <p className={classes.smile}>:(</p>
          <p className={classes.text}>Извините, но по вашему запросу ничего не найдено</p>
          <ShowAllButton fullWidth onClick={onActionButtonClick}>
            посмотреть все
          </ShowAllButton>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <ExpandedGrid container component="ul" className={classes.list}>
        {products.map((product) => {
          return (
            <ExpandedGrid key={product.id} component="li" item xs={6} md={4} xl={3} desktop={2}>
              <CatalogItem
                id={product.id}
                url={product.preview}
                title={product.title}
                currentPrice={product.currentPrice}
                inStock={product.instock}
                mainTag={product.mainTag}
                basePrice={product.basePrice}
                hidden={product.isHidden}
              />
            </ExpandedGrid>
          )
        })}
      </ExpandedGrid>
      <div className={classes.paginationWrapper}>
        <Pagination route={routeNames.catalog} total={totalPages} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Products
