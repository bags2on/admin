import React from 'react'
import NavList from './NavList/NavList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: '#313131'
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
