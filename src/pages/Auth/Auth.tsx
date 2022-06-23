import React, { useState, useRef } from 'react'
import { Box, Input, Title, LoaderWrapper } from './Auth.styled'
import ScaleLoader from '../../shared/Loader/Loader'
import { useLazyQuery } from '@apollo/client'
import { loginRootSchema } from '../../utils/validationSchemas'
import { Formik, Form } from 'formik'
import {
  LogInRootQuery,
  LogInRootVariables,
  LogInRootDocument
} from '../../graphql/user/_gen_/loginRoot.query'
import { UserMutations } from '../../apollo/cache/mutations'
import history from '../../utils/history'
import routeNames from '../../utils/routeNames'

interface formValues {
  keyWord: string
}

const Auth: React.FC = () => {
  const [withError, setWithError] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [logIn, { loading }] = useLazyQuery<LogInRootQuery, LogInRootVariables>(LogInRootDocument, {
    onCompleted: (data) => {
      const ok = UserMutations.extractUserData(data.logInRoot?.token || '')
      if (ok) history.replace(routeNames.orders)
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
    <Box>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={loginRootSchema}
        initialValues={{
          keyWord: ''
        }}
      >
        {() => (
          <Form ref={formRef}>
            <div>
              <Title>keyword:</Title>
              <Input
                $animated={withError}
                type="password"
                name="keyWord"
                autoComplete="off"
                autoFocus
                onAnimationEnd={(): void => {
                  setWithError(false)
                }}
              />

              <LoaderWrapper>{loading && <ScaleLoader />}</LoaderWrapper>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default Auth
