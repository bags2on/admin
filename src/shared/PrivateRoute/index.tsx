import React from 'react'
import routeNames from '../../utils/routeNames'
import { GET_AUTHENTICATION_STATE } from '../../apollo/cache/queries/user'
import { useQuery } from '@apollo/client'
import { Redirect, Route } from 'react-router-dom'

interface PrivateRouteProps {
  path: string
  exact?: boolean
  component: React.FC<any>
}

interface authState {
  isAuthenticated: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...otherProps }) => {
  const { data } = useQuery<authState>(GET_AUTHENTICATION_STATE)

  const isAuth = data?.isAuthenticated

  return (
    <Route
      {...otherProps}
      render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={routeNames.auth} />)}
    />
  )
}

export default PrivateRoute
