/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import routeNames from '../../utils/routeNames'
import Fallback from '../../components/Fallback/Fallback'
import MainInputs from './MainInputs'
import PhotosUpload from './PhotosUpload/PhotosUpload'
import { useLazyQuery, useMutation } from '@apollo/client'
import { UiMutations } from '../../apollo/cache/mutations'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { createProductSchema } from '../../utils/validation/validationSchemas'
import {
  CreateProductMutation,
  CreateProductVariables,
  CreateProductDocument
} from '../../graphql/product/_gen_/createProduct.mutation'
import {
  GetProductByIdQuery,
  GetProductByIdVariables,
  GetProductByIdDocument
} from '../../graphql/product/_gen_/productById.query'
import {
  UpdateProductMutation,
  UpdateProductVariables,
  UpdateProductDocument
} from '../../graphql/product/_gen_/updateProduct.mutation'
import { useLocation, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '21px 30px 10px 30px'
  },
  rootEdit: {
    paddingTop: 40
  },
  editPlug: {
    margin: 0,
    backgroundColor: theme.palette.primary.main,
    color: '#343434',
    textAlign: 'center',
    textTransform: 'uppercase',
    position: 'fixed',
    width: '100%',
    zIndex: 100
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
}))

type File = {
  name?: string
  preview: string
}

interface routeParams {
  id: string
}

const CreateProduct: React.FC = () => {
  const classes = useStyles()

  const { pathname } = useLocation()
  const { id } = useParams<routeParams>()

  const isCreateMode = pathname === routeNames.createProduct

  const [initialValues, setInitialValues] = useState({
    instock: true,
    title: '',
    amount: '',
    basePrice: '',
    currentPrice: '',
    gender: '',
    color: '',
    material: '',
    mainTag: 'REGULAR',
    category: '',
    description: ''
  })

  const [hasDiscount, setDiscount] = useState<boolean>(false)
  const [isHidden, setHidden] = useState<boolean>(true)

  const [mainPhoto, setMainPhoto] = useState<File | null>(null)
  const [subPhotos, setSubPhotos] = useState<File[]>([
    {
      preview: ''
    },
    {
      preview: ''
    }
  ])

  const [createProduct] = useMutation<CreateProductMutation, CreateProductVariables>(
    CreateProductDocument,
    {
      onCompleted: (data) => {
        console.log(data.createProduct?.id)
      }
    }
  )

  const [updateProduct] = useMutation<UpdateProductMutation, UpdateProductVariables>(
    UpdateProductDocument
  )

  const [getProductById, { loading }] = useLazyQuery<GetProductByIdQuery, GetProductByIdVariables>(
    GetProductByIdDocument,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const { product } = data
        if (product?.__typename === 'Product') {
          setInitialValues((prev) => {
            return {
              ...prev,
              instock: product.instock,
              title: product.title,
              amount: product.amount + '',
              basePrice: product.basePrice + '',
              currentPrice: product.currentPrice + '',
              gender: product.gender,
              category: product.category,
              material: product.features.material,
              color: product.features.color,
              mainTag: product.mainTag,
              description: product.description,
              isHidden: product.isHidden
            }
          })

          setMainPhoto({
            preview: product.preview
          })
          setHidden(product.isHidden)
          setDiscount(product.basePrice !== product.currentPrice)
        } else {
          console.log(data.product)
        }
      }
    }
  )

  useEffect(() => {
    document.title = isCreateMode ? 'Создать товар' : 'Редактировать товар'
    if (!isCreateMode) {
      if (id !== 'plug') {
        getProductById({
          variables: {
            id
          }
        })
      }
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    console.log(values)

    const {
      title,
      basePrice,
      amount,
      instock,
      gender,
      mainTag,
      color,
      material,
      category,
      description
    } = values

    let currentPrice = values.currentPrice

    if (!currentPrice) {
      currentPrice = basePrice
    }

    const preview = mainPhoto

    try {
      const data = {
        title,
        amount,
        basePrice,
        currentPrice,
        instock,
        gender,
        mainTag,
        category,
        description,
        features: {
          category,
          material,
          color,
          gender
        }
      }

      if (isCreateMode) {
        await createProduct({
          variables: {
            ...data
          }
        })
        UiMutations.openSnackbar({
          message: 'Продукт успешно создан',
          type: 'success'
        })
      } else {
        await updateProduct({
          variables: {
            id,
            ...data
          }
        })
      }
    } catch (error) {
      UiMutations.openSnackbar({
        message: 'Ошибка создания продукта',
        type: 'error'
      })
    }
  }

  const handleDiscountCheck = (value: boolean) => {
    setDiscount(value)
  }

  const handleMainPhotoUpload = (newFile: File): void => {
    setMainPhoto(newFile)
  }

  const handleSubPhotoUpload = (newFiles: File[]): void => {
    setSubPhotos(newFiles)
  }

  // const isPhotoExist = Boolean(mainPhoto) // TODO

  if (loading) {
    return <Fallback />
  }

  return (
    <div style={{ position: 'relative' }}>
      {!isCreateMode && <p className={classes.editPlug}>режим редактирования</p>}
      <div
        className={clsx({
          [classes.root]: true,
          [classes.rootEdit]: !isCreateMode
        })}
      >
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={createProductSchema}
          initialValues={initialValues}
        >
          {({ values }) => (
            <Form>
              {/* {console.log(values)} */}
              <Grid container>
                <Grid item xs={5}>
                  <PhotosUpload
                    mainPhoto={mainPhoto}
                    onMainPhotoUpload={handleMainPhotoUpload}
                    subPhotos={subPhotos}
                    onSubPhotoUpload={handleSubPhotoUpload}
                  />
                </Grid>
                <Grid item xs={7}>
                  <MainInputs
                    productId={id}
                    isEditMode={isCreateMode}
                    isHidden={isHidden}
                    withDiscount={hasDiscount}
                    onDiscountCheck={handleDiscountCheck}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateProduct
