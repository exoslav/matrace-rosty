import $ from 'jquery'
import $ui from './externals/jquery-ui.min.js'

$(document).ready(function() {
  const defaultMinValue = 234
  const defaultMaxValue = 987

  const minField = $('.categories-filters__range-min')
  const maxField = $('.categories-filters__range-max')

  minField.html(`${defaultMinValue} Kč`)
  maxField.html(`${defaultMaxValue}  Kč`)

  $('.categories-filters__range-element').slider({
    range: true,
    min: defaultMinValue,
    max: defaultMaxValue,
    step: 81,
    values: [defaultMinValue, defaultMaxValue],
    slide: function( event, ui ) {
      const { values } = ui
      const minVal = values[0]
      const maxVal = values[1]

      console.log(minField)

      minField.html(`${minVal} Kč`)
      maxField.html(`${maxVal} Kč`)
    }
  })
})