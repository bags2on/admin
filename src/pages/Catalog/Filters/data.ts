interface FilterItem {
  options: Array<{
    label: string
    value: string
  }>
}

const gender: FilterItem = {
  options: [
    {
      label: 'Женский',
      value: 'FEMALE'
    },
    {
      label: 'Мужской',
      value: 'MALE'
    },
    {
      label: 'Uni-sex',
      value: 'UNISEX'
    }
  ]
}

const availability: FilterItem = {
  options: [
    {
      label: 'В наличии',
      value: 'inStock'
    },
    {
      label: 'Под заказ',
      value: 'byOrder'
    },
    {
      label: 'Не публичный',
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
      label: 'Все',
      value: '',
      disabled: false
    },
    {
      label: 'Новые',
      value: 'NEW',
      disabled: false
    },
    {
      label: 'Акция',
      value: 'STOCK',
      disabled: false
    }
  ]
}

const categories: FilterItem = {
  options: [
    {
      label: 'Чемоданы',
      value: 'SUITCASE'
    },
    {
      label: 'Сумки',
      value: 'BAG'
    },
    {
      label: 'Кошельки',
      value: 'WALLET'
    },
    {
      label: 'Рюкзаки',
      value: 'BACKPACK'
    },
    {
      label: 'Другое',
      value: 'OTHER'
    }
  ]
}

export default { gender, availability, radioGroup, categories }
