/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Search from './Search/Search'
import Loader from '../../shared/Loader/Loader'
import CatalogItem from '../../components/CatalogItem/CatalogItem'
import Pagination from '../../components/Pagination/Pagination'
import { useLazyQuery } from '@apollo/client'
import {
  AllProductsDocument,
  AllProductsQuery,
  AllProductsVariables
} from '../../graphql/product/_gen_/products.query'
import { makeStyles } from '@material-ui/core/styles'
import { CategoryType, Gender, MainTag, PriceRange } from '../../types'
import { useParams } from 'react-router-dom'
import Filters from './Filters/Filters'

const useStyles = makeStyles(() => ({
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  filtersBox: {
    width: 300,
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    right: '-100%',
    outline: 'none',
    zIndex: 1200,
    height: 'calc(100 * var(--vh))',
    transition: 'all 0.3s',
    padding: '0 10px'
  }
}))

function getQueryValues(values: FilterValues): queryValues {
  const { gender, availability, mainTag, priceRange, category } = values as FilterValues

  let price

  const [gt, lt] = priceRange

  if (gt && lt) price = { gt, lt }

  let instock: boolean | undefined

  if (availability.length === 1) {
    const map = { inStock: true, byOrder: false }
    instock = map[availability[0]]
  }

  return {
    instock,
    price,
    mainTag: (mainTag || undefined) as MainTag,
    gender: gender as Gender[],
    category: category as CategoryType[]
  }
}

type genderType = 'FEMALE' | 'MALE' | 'UNISEX'
type availabilityType = 'inStock' | 'byOrder'
type mainTagType = 'STOCK' | 'NEW'
type categoryType = 'BAG' | 'WALLET' | 'BACKPACK' | 'SUITCASE' | 'OTHER'
interface ParamTypes {
  page: string
}

interface FilterValues {
  availability: Array<availabilityType>
  gender: Array<genderType>
  mainTag: mainTagType
  priceRange: [number, number]
  category: Array<categoryType>
}

type queryValues = {
  instock: boolean | undefined
  price: PriceRange | undefined
  mainTag: MainTag
  gender: Gender[]
  category: CategoryType[]
}

const Catalog: React.FC = () => {
  const classes = useStyles()
  const { page } = useParams<ParamTypes>()
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])

  const formikRef = React.useRef<HTMLFormElement>(null)

  const numOfPage = !isNaN(Number(page)) ? Number(page) : 1

  const filtersInitialValues = {
    gender: [] as Gender[],
    availability: [],
    mainTag: '',
    priceRange: priceRange,
    category: [] as CategoryType[]
  }

  const [getProducts, { loading, data, error }] = useLazyQuery<
    AllProductsQuery,
    AllProductsVariables
  >(AllProductsDocument, {
    onCompleted: (data) => {
      if (data?.allProducts.priceRange) {
        const { gt, lt } = data.allProducts.priceRange
        setPriceRange([gt, lt])
      }
    }
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })

    const filters = sessionStorage.getItem('filters')

    if (filters) {
      const values = JSON.parse(filters) as FilterValues

      getProducts({
        variables: { ...getQueryValues(values), page: numOfPage }
      })
    } else {
      getProducts({
        variables: {
          gender: [],
          instock: undefined,
          category: [],
          page: numOfPage
        }
      })
    }
  }, [numOfPage])

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

  const handleFiltersSubmit = (values: FilterValues) => {
    sessionStorage.setItem('filters', JSON.stringify(values))

    getProducts({
      variables: { ...getQueryValues(values), page: numOfPage }
    })
  }

  console.log(data)

  const totalPages = data?.allProducts.pagination.totalPages

  return (
    <div>
      <Search />
      <div style={{ display: 'flex' }}>
        <div className={classes.filtersBox}>
          <Filters
            initValues={filtersInitialValues}
            priceRange={priceRange}
            formRef={formikRef}
            onSubmit={handleFiltersSubmit}
          />
        </div>
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
      <Pagination
        currentPage={isNaN(numOfPage) ? 1 : numOfPage}
        total={totalPages ? totalPages : 1}
        route="/catalog"
      />
    </div>
  )
}

export default Catalog
