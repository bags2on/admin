/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup'
import { NumberSchema } from 'yup'

const ENGLISH_ONLY_REGEX = /^[A-Za-z]+$/

function lessThanOtherField(
  this: NumberSchema<number | undefined, Record<string, any>, number | undefined>,
  ref: any,
  msg: string
): NumberSchema<number | undefined, Record<string, any>, number | undefined> {
  return this.test({
    name: 'lessThanOtherField',
    exclusive: false,
    message: (_params: any): string => {
      return msg
    },
    // params: { reference: ref ? ref.path : undefined },
    test: (_, value: any) => {
      if (!value.originalValue) {
        return true
      }

      if (value.originalValue === value.parent.basePrice) {
        return false
      }
      return value.originalValue <= value.parent.basePrice
    }
  })
}

yup.addMethod<NumberSchema>(yup.number, 'lessThanOtherField', lessThanOtherField)

export const createProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(10, '* минимум 10 символов')
    .max(100, '* максимум 100 символов')
    .required('* обязательное поле'),
  amount: yup
    .number()
    .integer('* только целочисленное')
    .positive('* число не может быть отрицательным')
    .required('* обязательное поле'),
  basePrice: yup
    .number()
    .positive('* число не может быть отрицательным')
    .integer('* только целочисленное')
    .required('* обязательное поле'),
  currentPrice: yup
    .number()
    .positive('* число не может быть отрицательным')
    .integer('* только целочисленное')
    .lessThanOtherField(
      yup.ref('basePrice'),
      '* не может быть больше или равняться изначальной цене'
    ),
  category: yup.string().required('* категория обязательное поле'),
  material: yup.string().required('* материал обязательное поле'),
  color: yup
    .string()
    .matches(ENGLISH_ONLY_REGEX, '* только английские буквы')
    .required('* цвет обязательное поле'),
  gender: yup.string().required('* гендер обязательное поле'),
  mainTag: yup.string(),
  // .lessThan(yup.ref('price')) // js solution
  description: yup.string().trim()
})

export const editProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(10, '* минимум 10 символов')
    .max(100, '* максимум 100 символов')
    .required('* обязательное поле'),
  price: yup
    .number()
    .positive('* число не может быть отрицательным')
    .integer('* только целочисленное')
    .required('* обязательное поле'),
  discount: yup
    .number()
    .integer('* только целочисленное')
    .lessThanOtherField(yup.ref('price'), '* не может быть больше или равняться изначальной цене'),
  description: yup.string().trim()
})

export type EditPropductSchemaType = yup.InferType<typeof editProductSchema>
