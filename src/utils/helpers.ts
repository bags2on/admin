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
