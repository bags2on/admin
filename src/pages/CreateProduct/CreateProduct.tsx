/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { gql, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '../../shared/Button/Button'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import PhotosUpload from '../CreateProduct/PhotosUpload/PhotosUpload'
import { createProductSchema } from '../../utils/validation/validationSchemas'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import CheckBox from '../../shared/FormFields/Checkbox/Checkbox'

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px 10px 0 10px'
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
  nameField: {},
  discountWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  discountCheckbox: {
    paddingBottom: 24
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

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $title: String!
    # $amount: Int!
    $basePrice: Int!
    $currentPrice: Int
    # $preview: Upload!
    # $images: [String]
    # $tags: [String]
    $instock: Boolean!
    $gender: Gender!
    $mainTag: String!
    $category: CategoryType!
    $description: String
  ) {
    createProduct(
      input: {
        title: $title
        # amount: $amount
        basePrice: $basePrice
        currentPrice: $currentPrice
        # preview: $preview
        # images: $images
        # tags: $tags
        gender: $gender
        instock: $instock
        mainTag: $mainTag
        category: $category
        description: $description
      }
    ) {
      message
    }
  }
`

const CreateProduct: React.FC = () => {
  const classes = useStyles()

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

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION)

  useEffect(() => {
    document.title = 'Создать товар'
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log(values)

    const { title, basePrice, currentPrice, description, tags, images } = values

    const preview = mainPhoto

    try {
      // const req = createProduct({
      //   variables: { title, basePrice, currentPrice, preview, description, tags, images }
      // })
      // console.log(req)
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

  const isPhotoExist = Boolean(mainPhoto)

  return (
    <div className={classes.root}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={createProductSchema}
        initialValues={{
          title: '',
          // amount: '', // TODO: add amount implementation
          basePrice: '',
          currentPrice: '',
          instock: true,
          description: ''
          // tags: []
        }}
      >
        {({ values, isValid, setFieldValue }) => (
          <Form>
            {/* {console.log(values)} */}
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
                  <FormControl className={clsx(classes.formField)}>
                    <CheckBox name="instock" label="В наличии" disableMessage />
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput fullWidth label="Заголовок" name="title" />
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <div className={classes.flatFormField}>
                      <p>Количество шт:</p>
                      <TextInput disabled hiddenLabel name="amount" type="number" />
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
