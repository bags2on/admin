/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import {
  AllOrdersQuery,
  AllOrdersVariables,
  AllOrdersDocument
} from '../../graphql/order/_gen_/allOrders.query'
import history from '../../utils/history'
import routeNames from '../../utils/routeNames'

const List = styled.ul`
  list-style: none;
`

const ListItem = styled.li`
  margin: 10px;
  border: 1px solid #fff;
`

const Orders: React.FC = () => {
  const { data } = useQuery<AllOrdersQuery, AllOrdersVariables>(AllOrdersDocument, {
    variables: {
      input: {
        status: 'admin' // TODO: do not forget!
      }
    }
  })

  const handleRedirect = (id: string) => {
    history.push(routeNames.orderDetails + id)
  }

  return (
    <div>
      <h1>Orders:</h1>
      <List>
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
            <ListItem key={order.id} onClick={() => handleRedirect(order.id)}>
              <span>{order.id};</span>&nbsp;
              <span>{order.status};</span>&nbsp;
              <span>{formatDate}</span>
            </ListItem>
          )
        })}
        <ListItem style={{ background: 'red' }} onClick={() => handleRedirect('-1')}>
          Does not exist!
        </ListItem>
        <ListItem style={{ background: 'red' }} onClick={() => handleRedirect('---')}>
          Invalid ID
        </ListItem>
      </List>
    </div>
  )
}

export default Orders
