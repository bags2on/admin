/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import Fallback from '../../components/Fallback/Fallback'
import Info from './Info/Info'
import PreviewList from './PreviewList/PreviewList'
import routeNames from '../../utils/routeNames'
import { Grid } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { Navigate, useParams } from 'react-router'
import {
  OrderByIdQuery,
  OrderByIdVariables,
  OrderByIdDocument
} from '../../graphql/order/_gen_/orderById.query'
import { SharedMutations } from '../../apollo/cache/mutations'

interface RouteParams {
  orderId: string
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<keyof RouteParams>() as RouteParams

  const { data, loading, error } = useQuery<OrderByIdQuery, OrderByIdVariables>(OrderByIdDocument, {
    variables: {
      id: orderId
    },
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return <Fallback />
  }

  if (data?.order?.__typename === 'NotFound') {
    SharedMutations.openSnackbar({
      message: 'Ордер не найден',
      type: 'error'
    })
    return <Navigate to={routeNames.orders} />
  }

  if (error) {
    SharedMutations.openSnackbar({
      message: 'Неверный идентификатор ордера',
      type: 'error'
    })
    return <Navigate to={routeNames.orders} />
  }

  console.log(data)

  return (
    <div>
      <Grid container>
        <Grid item xs={5}>
          <PreviewList cartItems={data?.order!.cartItems} products={data?.order!.products} />
        </Grid>
        <Grid item xs={7}>
          <Info
            receiver={{
              name: data?.order?.receiverName,
              surname: data?.order?.receiverSurname,
              email: data?.order?.receiverEmail,
              phone: data?.order?.receiverPhone
            }}
            delivery={{
              city: data?.order?.cityId,
              supplier: data?.order?.supplier,
              postOffice: data?.order?.postOfficeId
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default OrderDetails
