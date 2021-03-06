export let priceStorage = []
export let totalItems = 1

export const updateTotalItems = newTotalItems => totalItems = newTotalItems

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
  return (
    priceStorage
      .reduce((prev, curr) => ({
      ...prev,
      price: prev.price + curr.price
      })).price * totalItems || 0
  )
}
