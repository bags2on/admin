import React from 'react'
import NavList from './NavList/NavList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 295,
    height: '100vh',
    backgroundColor: '#fff',
    borderRight: '1px solid #f1e7e7'
  }
}))

const SideBar: React.FC = () => {
  const classes = useStyles()

  return (
    <aside className={classes.root}>
      <NavList />
    </aside>
  )
}

export default SideBar
