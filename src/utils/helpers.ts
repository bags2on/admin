/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jwt-decode'
import { Observable } from '@apollo/client'

export const formatPrice = (num: number): string =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

// Only ":id"?
export const generateLink = (path: string, id: string): string => path.replace(':id', id)

export const formatPhoneNumber = (number: string | undefined): string => {
  if (!number) return 'not a number'

  const phone = number.replace(/[^\d]/g, '')

  if (phone.length == 10) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
  }

  return 'not a number'
}

interface tokenData {
  id: string
  name: string
  picture: string
  refreshToken: string
}

export const decodeToken = (): tokenData | undefined => {
  const token = localStorage.getItem('token') || ''
  if (!token) return
  try {
    const decoded = jwt<tokenData>(token)
    return decoded
  } catch (error) {
    return
  }
}

export const promiseToObservable = (promise: Promise<any>): Observable<unknown> =>
  new Observable((subscriber: any) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return
        subscriber.next(value)
        subscriber.complete()
      },
      (err) => subscriber.error(err)
    )
  })
