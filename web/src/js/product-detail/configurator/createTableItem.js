const createTableItem = (title, imgSrc, imgSrcPreview, tableId) => {
  let tableItem = '';

  if (imgSrc) {
    const elAttributes = {
      href: '#',
      class: 'configurator__item-img-wrap'
    };

    if (imgSrcPreview) {
      elAttributes.href = imgSrcPreview;
      elAttributes.class += ' configurator__item-img-wrap--preview';
      elAttributes['data-lightbox'] = `configurator-gallery-${tableId}`;
    }

    const link = $('<a/>', elAttributes);
    const icon = $('<i/>', { class: 'icon icon-zoom configurator__item__preview-icon' })
    const img = $('<img/>', {
      class: 'configurator__item-img',
      src: imgSrc,
      alt: title
    })

    icon.appendTo(link);
    img.appendTo(link);

    tableItem = link[0].outerHTML
  }

  return tableItem;
};

export default createTableItem;
