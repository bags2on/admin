import React from 'react'
import SideBar from '../SideBar/SideBar'
import { makeStyles } from '@material-ui/core/styles'

interface AppLayoutProps {
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  }
}))

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isAuthenticated = true

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* {isAuthenticated && <Sidebar menuLinks={getSidebarLinks(userRole)} />} */}
      {isAuthenticated && <SideBar />}
      <main>{children}</main>
      {/* <MessageSnackBar message={message} onClear={onClearMessage} /> */}
    </div>
  )
}

export default AppLayout
