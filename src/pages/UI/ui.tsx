import React from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../shared/FormFields/TextInput/TextInput'

const UISchema = yup.object({
  simpleInput: yup.string(),
  errorInput: yup.string().min(10, 'Мин 10 символов')
})

const UI: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <div style={{ paddingLeft: 50 }}>
        <h3>Ваш шедевр готов!</h3>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={UISchema}
          initialValues={{
            input: '',
            errorInput: 'Hello',
            price: ''
          }}
          initialErrors={{
            input: 'errorInput',
            errorInput: 'errorInput'
          }}
        >
          {() => (
            <Form>
              <h4>Text Inputs</h4>
              <TextInput label="Имя" name="simpleInput" />
              <TextInput label="ERROR" name="errorInput" />
              <h4>Number Input</h4>
              <TextInput label="Цена" name="price" type="number" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UI
