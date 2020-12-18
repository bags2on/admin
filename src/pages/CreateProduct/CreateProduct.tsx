import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
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
    padding: '30px 30px 0 30px',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%'
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
  name: string
  preview: string
}

const CreateProduct: React.FC = () => {
  const classes = useStyles()

  const [hasDiscount, setDiscount] = useState<boolean>(false)
  const [mainPhoto, setMainPhoto] = useState<File | null>(null)

  useEffect(() => {
    document.title = 'Создать товар'
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any): void => {
    console.log(values)
  }

  const handleDiscountClick = () => {
    setDiscount(!hasDiscount)
  }

  const handleMainPhotoUpload = (f: File): void => {
    setMainPhoto(f)
  }

  return (
    <div className={classes.root}>
      <Formik
        // validateOnChange={false}
        // validateOnBlur={false}
        onSubmit={handleSubmit}
        validationSchema={createProductSchema}
        initialValues={{
          title: '',
          price: '',
          discountPrice: '',
          description: '',
          tags: [],
          preview: '',
          images: []
        }}
      >
        {({ values, isValid }) => (
          <Form encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div
                  style={
                    {
                      // backgroundColor: '#f9f9f9'
                    }
                  }
                >
                  <PhotosUpload mainPhoto={mainPhoto} onMainPhotoUpload={handleMainPhotoUpload} />
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
                  <FormControl className={clsx(classes.formField, classes.priceField)}>
                    <Grid container>
                      <Grid item xs={7}>
                        <TextInput label="Цена (грн.)" name="price" type="number" />
                      </Grid>
                      <Grid item xs={5}>
                        {/* TODO: Clear discountPrice when hide! */}
                        <Button
                          color="secondary"
                          withShadow={false}
                          userBgColor="#4F3F74"
                          onClick={handleDiscountClick}
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
                    disabled={!isValid}
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
