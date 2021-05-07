/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup'
import { NumberSchema } from 'yup'

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

      if (value.originalValue === value.parent.price) {
        return false
      }
      return value.originalValue <= value.parent.price
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
  price: yup
    .number()
    .positive('* число не может быть отрицательным')
    .integer('* только целочисленное')
    .required('* обязательное поле'),
  discountPrice: yup
    .number()
    .positive('* число не может быть отрицательным')
    .integer('* только целочисленное')
    .lessThanOtherField(yup.ref('price'), '* не может быть больше или равняться изначальной цене'),
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
  discountPrice: yup
    .number()
    .positive('* число не может быть отрицательным')
    .integer('* только целочисленное')
    .lessThanOtherField(yup.ref('price'), '* не может быть больше или равняться изначальной цене')
})

export type EditPropductSchemaType = yup.InferType<typeof editProductSchema>
