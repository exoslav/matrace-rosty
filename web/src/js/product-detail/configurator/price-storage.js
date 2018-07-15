export let priceStorage = []

const emptyPriceStorage = () => {
	priceStorage = []
}

export const updatePriceStorage = (optionId, price) => {
  const newStorage = priceStorage.map((item) => {
    if (item.optionId === optionId) {
      return { ...item, price }
    }

    return { ...item }
  })

  priceStorage = newStorage
}

export const addItemToPriceStorage = (item) => {
  priceStorage.push(item)
}

export const getTotalPrice = () => {
  return priceStorage.reduce((prev, curr) => ({ ...prev, price: prev.price + curr.price })).price || 0
}
