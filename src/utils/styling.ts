export const getColorForMainTagName = (name: string): string => {
  switch (name) {
    case 'NEW':
      return '#6EBE90'
    case 'TOP':
      return '#FFC63D'
    case 'STOCK':
      return '#d81e1e'
    default:
      return ''
  }
}
