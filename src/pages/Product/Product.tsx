import React, { useState } from 'react'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import { Formik, Form } from 'formik'
import { useParams } from 'react-router-dom'
import Loader from '../../shared/Loader/Loader'
import { useQuery, useMutation } from '@apollo/client'
import FormControl from '@material-ui/core/FormControl'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import Button from '../../shared/Button/Button'
import {
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductByIdVariables
} from '../../graphql/product/_gen_/productById.query'
import {
  UpdateProductDocument,
  UpdateProductMutation,
  UpdateProductVariables
} from '../../graphql/product/_gen_/updateProduct.mutation'
import { editProductSchema } from '../../utils/validation/validationSchemas'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 30px 0 30px',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%'
  },
  formField: {
    maxWidth: 500,
    display: 'block'
  },
  priceField: {},
  addDiscountButton: {
    marginTop: 8,
    fontSize: 14,
    padding: 7
  },
  submitButton: {
    width: 250,
    padding: '15px 0'
  }
}))

interface ProductID {
  id: string
}

const Product: React.FC = () => {
  const classes = useStyles()
  const { id } = useParams<ProductID>()
  const [hasDiscount, setDiscount] = useState<boolean>(false)

  const { loading, data, error } = useQuery<GetProductByIdQuery, GetProductByIdVariables>(
    GetProductByIdDocument,
    {
      variables: {
        id
      },
      fetchPolicy: 'network-only'
      // onCompleted(data) {
      //   console.log(data)
      //   if (data) {
      //     const x = data.product?.basePrice
      //     const y = data.product?.currentPrice
      //     setDiscount(x !== y)
      //   }
      // }
    }
  )

  const [updateProduct, updateOptions] = useMutation<UpdateProductMutation, UpdateProductVariables>(
    UpdateProductDocument
  )

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Loader fallback />
      </div>
    )
  }

  if (error) {
    return <h1>Access denied</h1>
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any): Promise<void> => {
    console.log(values)
    values.instock = true
    const resp = await updateProduct({
      variables: {
        // id: data?.product?.id,
        id: 'TODO',
        ...values
      }
    })

    console.log(resp)
  }

  if (!data) {
    return <p>Null data</p>
  }

  const { product } = data

  if (!product) {
    return <p>Null data product</p>
  }

  const handleDiscountClick = () => {
    setDiscount(!hasDiscount)
  }

  return (
    <div className={classes.root}>
      <h1>Product</h1>
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={editProductSchema}
        initialValues={{
          // title: product.title,
          // price: product.currentPrice,
          // discount: product.basePrice,
          // description: product.description
          title: '',
          price: '',
          discount: '',
          description: ''
        }}
      >
        {({ values, isValid, setFieldValue }) => (
          <Form>
            {/* {console.log(values, errors)} */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput label="Заголовок" name="title" fullWidth />
                  </FormControl>
                  <FormControl className={clsx(classes.formField, classes.priceField)}>
                    <Grid container>
                      <Grid item xs={7}>
                        <TextInput label="Цена (грн.)" name="price" type="number" />
                      </Grid>
                      <Grid item xs={5}>
                        <Button
                          disableShadow
                          color="secondary"
                          onClick={() => {
                            setFieldValue('discount', '')
                            handleDiscountClick()
                          }}
                          className={classes.addDiscountButton}
                        >
                          {hasDiscount ? 'Убрать акцию' : 'Добавить акцию'}
                        </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                  {hasDiscount && (
                    <FormControl className={clsx(classes.formField)}>
                      <TextInput
                        disabled={!!!values.price}
                        label="Акционная цена (грн.)"
                        name="discount"
                        type="number"
                      />
                    </FormControl>
                  )}
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput
                      label="Описание"
                      name="description"
                      fullWidth
                      multiline
                      maxLength={500}
                      rows={5}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    disableShadow
                    loading={updateOptions.loading}
                    color="secondary"
                    disabled={!isValid}
                    className={classes.submitButton}
                  >
                    Сохранить изменения
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Product
