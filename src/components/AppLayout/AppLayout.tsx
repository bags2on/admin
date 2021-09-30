import React from 'react'
import SideBar from '../SideBar/SideBar'
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

  return (
    <div className={classes.root}>
      {/* {isAuthenticated && <Sidebar menuLinks={getSidebarLinks(userRole)} />} */}
      <SideBar />
      <main className={classes.content}>{children}</main>
      {/* <MessageSnackBar message={message} onClear={onClearMessage} /> */}
    </div>
  )
}

export default AppLayout
