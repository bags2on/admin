import React from 'react'
import { useEventSource } from '@sse-lib/react-sse'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {}
}))

const Orders: React.FC = () => {
  const classes = useStyles()

  const { data } = useEventSource('new-order')

  return (
    <div className={classes.root}>
      <h1>Orders:</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default Orders
