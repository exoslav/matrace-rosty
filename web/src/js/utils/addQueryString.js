const addQueryString = (queryString) => {
  if (window.history.pushState) {
    const newURL = new URL(window.location.href);
    newURL.search = `?${queryString}`;
    window.history.replaceState({ path: newURL.href }, '', newURL.href);
  } else {
    console.warn('Current browser does not support history API! Unable to add query-string to url.');
  }
}

export default addQueryString;
