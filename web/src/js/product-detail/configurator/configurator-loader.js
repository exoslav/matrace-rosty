const loaders = [];
const loaderClassName = 'configurator__option-loader';
const optionLoadingClassName = 'configurator__option--loading';

const createLoaderObject = (optionId) => ({
  optionId,
  element: $(`<div class=${loaderClassName}></div>`)
});

const getLoaderIndexInArray = (optionId) => {
  let loaderIndexInArray = null;

  loaders.map((loader, index) => {
    if (loader.optionId === optionId) {
      loaderIndexInArray = index;
    }
  });

  return loaderIndexInArray;
}

const addLoaderToLoaders = (loader) => loaders.push(loader);

const removeLoaderFromLoaders = (optionId) => {
  let loaderIndexInArray = getLoaderIndexInArray();

  if (loaderIndexInArray) {
    loaders.splice(loaderIndexInArray, 1);
  }
};

const loaderExits = (optionId) => !!loaders.filter(loader => loader.optionId === optionId)[0];

export const dataLoading = (optionElement) => optionElement.hasClass(optionLoadingClassName);

export const addLoadingClassNameToOption = (optionElement) => optionElement.addClass(optionLoadingClassName);

export const removeLoadingClassNameFromOption = (optionElement) => optionElement.removeClass(optionLoadingClassName);

export const appendLoader = (element, optionId) => {
  if (loaderExits()) {
    return;
  }

  const loaderObject = createLoaderObject(optionId);

  loaderObject.element.appendTo(element);

  addLoaderToLoaders(loaderObject);
};

export const removeLoader = (optionId) => {
  loaders.map(loader => {
    loader.optionId === optionId ? loader.element.remove() : null
  });

  removeLoaderFromLoaders(optionId);
};
