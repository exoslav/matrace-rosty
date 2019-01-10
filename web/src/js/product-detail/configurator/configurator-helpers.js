import configuration from '../../configuration';
import { TYPE_VARIANT, TYPE_ATTRIBUTE} from './configurator';

export const getOptionItemPosition = (optionItems, currentOptionItem) => {
  let position = 0;

  optionItems.each((index, item) => {
    if (item === currentOptionItem) {
      position = index + 1;
    }
  })

  return position;
}

export const getArrowDirection = (optionItemPosition) => {
  return optionItemPosition % 2 === 0
    ? 'right' : 'left';
}

export const formatPrice = price => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const getConfiguratorUrlByType = (type, productId, optionId) => {
  if (!type || !productId || !optionId) {
    return null;
  }

  let url = null;

  if (type === TYPE_VARIANT) {
    url = createUrl(configuration.api.productConfigurator.variantUrl, productId);
  }

  if (type === TYPE_ATTRIBUTE) {
    url = createUrl(configuration.api.productConfigurator.attributeUrl, optionId);
  }

  console.log(url);
  return url;
}

function createUrl(url, id) {
  return `${url + id}`;
}

