const configuration = {
  api: {
    productConfigurator: {
      variantUrl: '/api/product/get-price-variants/',
      attributeUrl: '/api/attribute/get-variants/'
    },
    listingPageUrl: '/api/product/get-list' // use for getting products on listing page (including filtering api)
  }
};

export default configuration;
