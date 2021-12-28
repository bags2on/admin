import React from 'react'
import SideBar from '../SideBar/SideBar'
import Snackbar from '../Snackbar/Snackbar'
import { useQuery } from '@apollo/client'
import { GET_SNACKBAR_MESSAGE } from '../../apollo/cache/queries/ui'
import { GET_AUTHENTICATION_STATE } from '../../apollo/cache/queries/user'
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
  const classes = useStyles()
  const auth = useQuery(GET_AUTHENTICATION_STATE)

  const isAuth = auth.data?.isAuthenticated

  const snackbarMessage = useQuery(GET_SNACKBAR_MESSAGE)
  const snackbarData = snackbarMessage.data.snackbarMessage

  return (
    <div className={classes.root}>
      {isAuth && <SideBar />}
      <main className={classes.content}>{children}</main>
      <Snackbar message={snackbarData.message} type={snackbarData.type} />
    </div>
  )
}

export default AppLayout
