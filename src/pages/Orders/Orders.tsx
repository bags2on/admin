import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Orders: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>Orders:</h1>
    </div>
  )
}

export default Orders
