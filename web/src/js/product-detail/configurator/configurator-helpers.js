export const getOptionItemPosition = (optionItems, currentOptionItem) => {
  let position = 0

  optionItems.each((index, item) => {
    if (item === currentOptionItem) {
      position = index + 1
    }
  })

  return position
}

export const getArrowDirection = (optionItemPosition) => {
  return optionItemPosition % 2 === 0
    ? 'right' : 'left'
}

export const formatPrice = price => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
