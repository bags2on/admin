/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '../../shared/Button/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/SvgIcon'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import PhotosUpload from './PhotosUpload/PhotosUpload'
import { createProductSchema } from '../../utils/validation/validationSchemas'
import { Checkbox, FormControlLabel } from '@material-ui/core'
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
import CheckBox from '../../shared/FormFields/Checkbox/Checkbox'
import { CategoryType, Gender } from '../../types'
import { useLocation, useParams } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../../asset/svg/delete.svg'
import routeNames from '../../utils/routeNames'

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px 10px 0 10px'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  formField: {
    maxWidth: 500,
    display: 'block'
  },
  flatFormField: {
    display: 'flex',
    alignItems: 'center',

    '& > p': {
      flexBasis: '35%',
      fontSize: 18,
      padding: '0 0 24px 0'
    }
  },
  genderField: {
    maxWidth: 300
  },
  categoryField: {
    maxWidth: 300
  },
  discountWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  discountCheckbox: {
    paddingBottom: 24
  },
  deleteButton: {
    // padding: 0\
    color: 'red',
    marginLeft: 'auto'
  },
  submitButton: {
    width: 200,
    padding: '15px 0'
  }
}))

type File = {
  name?: string
  preview: string
}

type optionType = {
  label: string
  value: string
}

interface routeParams {
  id: string
}

const CreateProduct: React.FC = () => {
  const classes = useStyles()

  const { pathname } = useLocation()
  const { id } = useParams<routeParams>()

  console.log('Params id:', id)

  const isCreateMode = pathname === routeNames.createProduct

  const [initialValues, setInitialValues] = useState({
    instock: true,
    title: '',
    amount: '',
    basePrice: '',
    currentPrice: '',
    gender: '',
    mainTag: '',
    category: '',
    description: ''
  })

  const [hasDiscount, setDiscount] = useState<boolean>(false)
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

  const [getProductById] = useLazyQuery<GetProductByIdQuery, GetProductByIdVariables>(
    GetProductByIdDocument,
    {
      onCompleted: (data) => {
        const { product } = data
        if (product?.__typename === 'Product') {
          setInitialValues((prev) => {
            console.log(product.category)
            return {
              ...prev,
              instock: product.instock,
              title: product.title,
              amount: product.amount + '',
              basePrice: product.basePrice + '',
              currentPrice: product.currentPrice + '',
              gender: product.gender.toUpperCase(),
              category: product.category.toUpperCase(),
              mainTag: product.mainTag,
              description: product.description
            }
          })

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
  const handleSubmit = (values: any) => {
    console.log(values)

    const { title, basePrice, amount, instock, gender, mainTag, category, description } = values

    let currentPrice = values.currentPrice

    if (!currentPrice) {
      currentPrice = basePrice
    }

    const preview = mainPhoto

    try {
      const req = createProduct({
        variables: {
          title,
          amount,
          basePrice,
          currentPrice,
          instock,
          gender,
          mainTag,
          category,
          description
        }
      })
      console.log(req)
    } catch (error) {
      console.log('error: ', error)
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

  const handleDeleteButtonClick = () => {
    console.log('delete')
  }

  const isPhotoExist = Boolean(mainPhoto)

  const getCategoryOptions = (): optionType[] => {
    const labels: { [name: string]: string } = {
      Bag: 'Сумка',
      Wallet: 'Кошелек',
      Backpack: 'Рюкзак',
      Suitcase: 'Чемодан',
      Other: 'Другое'
    }

    return Object.keys(CategoryType).map((value) => ({
      label: labels[value],
      value: value.toUpperCase()
    }))
  }

  const getGenderOptions = (): optionType[] => {
    const labels: { [name: string]: string } = {
      Female: 'Женский',
      Male: 'Мужской',
      Unisex: 'Уни-секс'
    }

    return Object.keys(Gender).map((gender) => ({
      label: labels[gender],
      value: gender.toUpperCase()
    }))
  }

  return (
    <div className={classes.root}>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={createProductSchema}
        initialValues={initialValues}
      >
        {({ values, isValid, setFieldValue }) => (
          <Form>
            {/* {console.log(values)}z */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div
                  style={
                    {
                      // backgroundColor: '#f9f9f9'
                    }
                  }
                >
                  <PhotosUpload
                    mainPhoto={mainPhoto}
                    onMainPhotoUpload={handleMainPhotoUpload}
                    subPhotos={subPhotos}
                    onSubPhotoUpload={handleSubPhotoUpload}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={
                    {
                      // backgroundColor: '#b1c3D0'
                    }
                  }
                >
                  <div className={classes.wrapper}>
                    <FormControl className={clsx(classes.formField)}>
                      <CheckBox name="instock" label="В наличии" disableMessage />
                    </FormControl>
                    {!isCreateMode && (
                      <IconButton
                        disableRipple
                        className={classes.deleteButton}
                        onClick={handleDeleteButtonClick}
                      >
                        <Icon component="span">
                          <DeleteIcon />
                        </Icon>
                      </IconButton>
                    )}
                  </div>
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput fullWidth label="Заголовок" name="title" />
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <div className={classes.flatFormField}>
                      <p>Количество шт:</p>
                      <TextInput hiddenLabel name="amount" type="number" />
                    </div>
                  </FormControl>
                  <FormControl className={classes.formField}>
                    <div className={classes.flatFormField}>
                      <p>Цена (грн.)</p>
                      <TextInput hiddenLabel name="basePrice" type="number" />
                    </div>
                  </FormControl>
                  <div className={classes.discountWrapper}>
                    <FormControlLabel
                      className={classes.discountCheckbox}
                      label={hasDiscount ? 'Убрать акцию' : 'Добавить акцию'}
                      control={
                        <Checkbox
                          checked={hasDiscount}
                          onChange={(e) => {
                            setFieldValue('currentPrice', '')
                            handleDiscountCheck(e.target.checked)
                          }}
                        />
                      }
                    />
                    {hasDiscount && (
                      <FormControl className={clsx(classes.formField)}>
                        <TextInput
                          disabled={!!!values.basePrice}
                          label="Акционная цена (грн.)"
                          name="currentPrice"
                          type="number"
                        />
                      </FormControl>
                    )}
                  </div>
                  <FormControl className={clsx(classes.formField)}>
                    <div className={classes.genderField}>
                      <TextInput
                        select
                        label="Гендер"
                        name="gender"
                        fullWidth
                        options={getGenderOptions()}
                      />
                    </div>
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <div className={classes.flatFormField}>
                      <p>Главный тэг:</p>
                      <TextInput hiddenLabel name="mainTag" />
                    </div>
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <div className={classes.genderField}>
                      <TextInput
                        select
                        label="Категория"
                        name="category"
                        fullWidth
                        options={getCategoryOptions()}
                      />
                    </div>
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput label="Описание" name="description" fullWidth multiline rows={5} />
                  </FormControl>
                  <Button
                    type="submit"
                    disableShadow
                    color="secondary"
                    // disabled={!isPhotoExist || !isPhotoExist || !isValid}
                    disabled={!isValid}
                    className={classes.submitButton}
                  >
                    создать
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

export default CreateProduct
