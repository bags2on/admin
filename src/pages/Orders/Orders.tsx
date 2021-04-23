import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 30px 0 30px',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%'
  }
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
