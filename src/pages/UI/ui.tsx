import React from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../shared/FormFields/TextInput/TextInput'
import Button from '../../shared/Button/Button'

import TextInputs from './TextInputs/TextInputs'

const UISchema = yup.object({
  simpleInput: yup.string(),
  errorInput: yup.string().min(10, 'Мин 10 символов').required('Необходимое поле')
})

const UI: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <div style={{ paddingLeft: 20 }}>
        <h3>Ваш шедевр готов!</h3>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={UISchema}
          initialValues={{
            simpleInput: '',
            errorInput: '',
            password: 'password',
            price: ''
          }}
          initialErrors={{
            input: '',
            errorInput: 'errorInput'
          }}
        >
          {() => (
            <Form>
              <TextInputs />
              <h4>Button</h4>
              <Button>send message</Button>
              <p>button with loading - main</p>
              <Button loading>send message</Button>
              <p>button with loading - main [disabled]</p>
              <Button disabled loading>
                send message
              </Button>
              <p>button with loading - secondary</p>
              <Button color="secondary" loading>
                send
              </Button>
              <p>button with loading - secondary [disabled]</p>
              <Button disabled color="secondary" loading>
                send
              </Button>
              <p>light button</p>
              <Button color="secondary" disableShadow>
                send message
              </Button>
              <p>light button loading</p>
              <Button color="secondary" loading darkLoader disableShadow>
                send message
              </Button>
              <p>disabled button</p>
              <Button color="secondary" disabled darkLoader disableShadow>
                send message
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UI
