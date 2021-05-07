export const formatPrice = (num: number): string => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

// Only ":id"?
export const generateLink = (path: string, id: string): string => path.replace(':id', id)
