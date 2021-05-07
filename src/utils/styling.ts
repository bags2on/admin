export const getColorForMainTagName = (name: string): string => {
  switch (name) {
    case 'new':
      return '#6EBE90'
    case 'top':
      return '#FFC63D'
    case 'stock':
      return '#d81e1e'
    default:
      return ''
  }
}
