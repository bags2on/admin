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

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px 10px 0 10px'
  },
  formField: {
    maxWidth: 500,
    display: 'block'
  },
  nameField: {},
  priceField: {},
  addDiscountButton: {
    marginTop: 8,
    fontSize: 14,
    padding: 7
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
    $price: Int!
    $discountPrice: Int
    $preview: Upload!
    $images: [String]
    $tags: [String]
    $description: String
  ) {
    createProduct(
      input: {
        title: $title
        price: $price
        discountPrice: $discountPrice
        preview: $preview
        images: $images
        tags: $tags
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

    const { title, price, discountPrice, description, tags, images } = values

    const preview = mainPhoto

    try {
      const req = createProduct({
        variables: { title, price, discountPrice, preview, description, tags, images }
      })

      console.log(req)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handleDiscountClick = () => {
    setDiscount(!hasDiscount)
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
          storageAmount: '', // TODO storageAmount implementation
          price: '',
          discountPrice: '',
          description: '',
          tags: []
        }}
      >
        {({ values, isValid, setFieldValue }) => (
          <Form>
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
                    <TextInput label="Заголовок" name="title" fullWidth />
                  </FormControl>
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput disabled label="Количество шт." name="storageAmount" type="number" />
                  </FormControl>
                  <FormControl className={clsx(classes.formField, classes.priceField)}>
                    <Grid container>
                      <Grid item xs={7}>
                        <TextInput label="Цена (грн.)" name="price" type="number" />
                      </Grid>
                      <Grid item xs={5}>
                        {console.log(values)}
                        <Button
                          color="secondary"
                          withShadow={false}
                          userBgColor="#4F3F74"
                          onClick={() => {
                            setFieldValue('discountPrice', '')
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
                        name="discountPrice"
                        type="number"
                      />
                    </FormControl>
                  )}
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput label="Описание" name="description" fullWidth multiline rows={5} />
                  </FormControl>
                  <Button
                    type="submit"
                    color="secondary"
                    disabled={!isPhotoExist || !isPhotoExist || !isValid}
                    withShadow={false}
                    className={classes.submitButton}
                    userBgColor="#1CC283"
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
