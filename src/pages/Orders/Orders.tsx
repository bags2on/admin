/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useQuery } from '@apollo/client'
import { useEventSource } from '@sse-lib/react-sse'
import { makeStyles } from '@material-ui/core/styles'
import {
  AllOrdersQuery,
  AllOrdersVariables,
  AllOrdersDocument
} from '../../graphql/order/_gen_/allOrders.query'

const useStyles = makeStyles(() => ({
  root: {},
  list: {
    listStyle: 'none'
  },
  listItem: {
    margin: 10,
    border: '1px solid #fff'
  }
}))

const Orders: React.FC = () => {
  const classes = useStyles()

  const event = useEventSource('new-order')

  const { data } = useQuery<AllOrdersQuery, AllOrdersVariables>(AllOrdersDocument, {
    variables: {
      input: {
        status: 'admin' // TODO: do not forget!
      }
    }
  })

  console.log(data?.allOrders)

  return (
    <div className={classes.root}>
      <h1>Orders:</h1>
      <div>{JSON.stringify(event.data)}</div>
      <ul className={classes.list}>
        {data?.allOrders.map((order) => {
          const data = new Date(Date.parse(order.createdAt))
          const formatDate = data.toLocaleString('ru-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC'
          })

          return (
            <li key={order.id} className={classes.listItem}>
              <span>{order.id};</span>&nbsp;
              <span>{order.status};</span>&nbsp;
              <span>{formatDate}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Orders
