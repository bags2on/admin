import React from 'react'
import SideBar from '../SideBar/SideBar'
import Snackbar from '../Snackbar/Snackbar'
import { useQuery } from '@apollo/client'
import { GET_SNACKBAR_EVENT } from '../../apollo/cache/queries/shared'
import { GET_AUTHENTICATION_STATE } from '../../apollo/cache/queries/user'
import { useWindowHeight } from '../../hooks'
import { makeStyles } from '@material-ui/core/styles'

interface AppLayoutProps {
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  content: {
    width: '100%',
    overflowY: 'auto',
    backgroundColor: '#313131'
  }
}))

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  useWindowHeight()
  const classes = useStyles()
  const auth = useQuery(GET_AUTHENTICATION_STATE)

  const isAuth = auth.data?.isAuthenticated

  const snackbarEvent = useQuery(GET_SNACKBAR_EVENT)
  const snackbarData = snackbarEvent.data.snackbarEvent

  return (
    <div className={classes.root}>
      {isAuth && <SideBar />}
      <main className={classes.content}>{children}</main>
      <Snackbar message={snackbarData.message} type={snackbarData.type} />
    </div>
  )
}

export default AppLayout
