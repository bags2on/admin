interface FilterItem {
  options: Array<{
    label: string
    value: string
  }>
}

const gender: FilterItem = {
  options: [
    {
      label: 'FEMALE',
      value: 'FEMALE'
    },
    {
      label: 'MALE',
      value: 'MALE'
    },
    {
      label: 'UNISEX',
      value: 'UNISEX'
    }
  ]
}

const availability: FilterItem = {
  options: [
    {
      label: 'inStock',
      value: 'inStock'
    },
    {
      label: 'byOrder',
      value: 'byOrder'
    },
    {
      label: 'isHidden',
      value: 'ishidden'
    }
  ]
}

const radioGroup: {
  options: Array<{
    label: string
    value: string
    disabled: boolean
  }>
} = {
  options: [
    {
      label: 'All',
      value: '',
      disabled: false
    },
    {
      label: 'New',
      value: 'NEW',
      disabled: false
    },
    {
      label: 'Stock',
      value: 'STOCK',
      disabled: false
    }
  ]
}

const categories: FilterItem = {
  options: [
    {
      label: 'SUITCASE',
      value: 'SUITCASE'
    },
    {
      label: 'BAG',
      value: 'BAG'
    },
    {
      label: 'WALLET',
      value: 'WALLET'
    },
    {
      label: 'BACKPACK',
      value: 'BACKPACK'
    },
    {
      label: 'OTHER',
      value: 'OTHER'
    }
  ]
}

export default { gender, availability, radioGroup, categories }
