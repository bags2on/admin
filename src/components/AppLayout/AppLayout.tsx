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
    padding: '20px 20px 10px 20px',
    backgroundColor: '#232323'
  },
  pageWrapper: {
    padding: '10px 30px 0 30px',
    backgroundColor: '#313131',
    borderRadius: 10,
    height: '100%',
    overflowY: 'auto'
  }
}))

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* {isAuthenticated && <Sidebar menuLinks={getSidebarLinks(userRole)} />} */}
      <SideBar />
      <main className={classes.content}>
        <div className={classes.pageWrapper}>{children}</div>
      </main>
      {/* <MessageSnackBar message={message} onClear={onClearMessage} /> */}
    </div>
  )
}

export default AppLayout
