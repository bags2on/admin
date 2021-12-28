import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import ScaleLoader from '../../shared/Loader/Loader'
import { useLazyQuery } from '@apollo/client'
import { loginRootSchema } from '../../utils/validation/validationSchemas'
import { Formik, Form, Field } from 'formik'
import {
  LogInRootQuery,
  LogInRootVariables,
  LogInRootDocument
} from '../../graphql/user/_gen_/loginRoot.query'
import { UserMutations } from '../../apollo/cache/mutations'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  title: {
    margin: 0,
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 7,
    paddingLeft: 7
  },
  input: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    outline: 'none',
    width: 300,
    borderRadius: 10,
    border: '2px solid',
    borderColor: '#afafaf',
    color: '#fff',
    backgroundColor: '#3c4144',
    padding: '15px 10px'
  },
  inputError: {
    borderColor: 'red',
    animation: '$error-blink 300ms ease-in-out'
  },
  submitButton: {
    display: 'block'
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 18,
    height: 25
  },
  '@keyframes error-blink': {
    '0%': {
      transform: 'translateX(0px)',
      animationTimingFunction: 'ease-in'
    },
    '37%': {
      transform: 'translateX(5px)',
      animationTimingFunction: 'ease-out'
    },
    '55%': {
      transform: 'translateX(-5px)',
      animationTimingFunction: 'ease-in'
    },
    '73%': {
      transform: 'translateX(4px)',
      animationTimingFunction: 'ease-out'
    },
    '82%': {
      transform: 'translateX(-4px)',
      animationTimingFunction: 'ease-in'
    },
    '91%': {
      transform: 'translateX(2px)',
      animationTimingFunction: 'ease-out'
    },
    '96%': {
      transform: 'translateX(-2px)',
      animationTimingFunction: 'ease-in'
    },
    '100%': {
      transform: 'translateX(0px)',
      animationTimingFunction: 'ease-in'
    }
  }
}))

interface formValues {
  keyWord: string
}

const Auth: React.FC = () => {
  const classes = useStyles()

  const [withError, setWithError] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [logIn, { loading }] = useLazyQuery<LogInRootQuery, LogInRootVariables>(LogInRootDocument, {
    onCompleted: (data) => {
      UserMutations.extractUserData(data.logInRoot?.token || '')
    },
    onError: () => {
      if (formRef) formRef.current?.reset()
      setWithError(true)
    }
  })

  const handleSubmit = (values: formValues) => {
    logIn({
      variables: {
        keyWord: values.keyWord
      }
    })
  }

  return (
    <div className={classes.root}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={loginRootSchema}
        initialValues={{
          keyWord: ''
        }}
      >
        {(): React.ReactElement => (
          <Form ref={formRef}>
            <div>
              <p className={classes.title}>keyword:</p>
              <Field
                type="password"
                name="keyWord"
                autoComplete="off"
                autoFocus
                onAnimationEnd={(): void => {
                  setWithError(false)
                }}
                className={clsx({
                  [classes.input]: true,
                  [classes.inputError]: withError
                })}
              />

              <div className={classes.loader}>{loading && <ScaleLoader />}</div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Auth
