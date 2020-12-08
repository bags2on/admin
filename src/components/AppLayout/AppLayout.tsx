import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

interface AppLayoutProps {
  children: React.ReactNode
}

const useStyles = makeStyles(() => ({
  root: {}
}))

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* {isAuthenticated && <Sidebar menuLinks={getSidebarLinks(userRole)} />} */}
      <main>{children}</main>
      {/* <MessageSnackBar message={message} onClear={onClearMessage} /> */}
    </div>
  )
}

export default AppLayout
