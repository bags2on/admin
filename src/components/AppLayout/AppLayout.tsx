import React from 'react'
import SideBar from '../SideBar/SideBar'
import { makeStyles } from '@material-ui/core/styles'

interface AppLayoutProps {
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  content: {
    width: '100%',
    padding: '40px 30px 20px 30px',
    backgroundColor: '#f5f5f4'
  }
}))

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isAuthenticated = true

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* {isAuthenticated && <Sidebar menuLinks={getSidebarLinks(userRole)} />} */}
      {isAuthenticated && <SideBar />}
      <main className={classes.content}>{children}</main>
      {/* <MessageSnackBar message={message} onClear={onClearMessage} /> */}
    </div>
  )
}

export default AppLayout
