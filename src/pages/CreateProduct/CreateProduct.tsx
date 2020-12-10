import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
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
  priceField: {}
}))

const CreateProduct: React.FC = () => {
  const classes = useStyles()

  const [hasDiscount, setDiscount] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'Создать товар'
  }, [])

  const handleSubmit = (): void => {
    console.log()
  }

  const handleDiscountClick = () => {
    setDiscount(!hasDiscount)
  }

  return (
    <div className={classes.root}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          price: '',
          discountPrice: '',
          description: ''
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
                    <TextInput label="Имя" name="name" fullWidth />
                  </FormControl>
                  <FormControl className={clsx(classes.formField, classes.priceField)}>
                    <Grid container>
                      <Grid item xs={7}>
                        <TextInput label="Цена" name="price" type="number" />
                      </Grid>
                      <Grid item xs={5}>
                        <Button variant="outlined" onClick={handleDiscountClick}>
                          {hasDiscount ? 'Убрать акцию' : 'Добавить акцию'}
                        </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                  {hasDiscount && (
                    <FormControl className={clsx(classes.formField)}>
                      <TextInput label="Акционная цена" name="discountPrice" type="number" />
                    </FormControl>
                  )}
                  <FormControl className={clsx(classes.formField)}>
                    <TextInput label="Описание" name="description" fullWidth multiline rows={5} />
                  </FormControl>
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
