import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '../../shared/Button/Button'
import TextInput from '../../shared/FormFields/TextInput/TextInput'

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

const CreateProduct: React.FC = () => {
  const classes = useStyles()

  const [hasDiscount, setDiscount] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'Создать товар'
  }, [])

  const handleSubmit = (values: any): void => {
    console.log(values)
  }

  const handleDiscountClick = () => {
    setDiscount(!hasDiscount)
  }

  return (
    <div className={classes.root}>
      <Formik
        onSubmit={handleSubmit}
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
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/*  */}
                <div
                  style={{
                    backgroundColor: '#b1c3D0',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <p>Photos Area</p>
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
                      <TextInput label="Акционная цена (грн.)" name="discountPrice" type="number" />
                    </FormControl>
                  )}
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput label="Описание" name="description" fullWidth multiline rows={5} />
                  </FormControl>
                  <Button
                    type="submit"
                    color="secondary"
                    // disabled
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
