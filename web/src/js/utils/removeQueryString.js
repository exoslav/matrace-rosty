import queryString from 'query-string';

const removeQueryString = (key) => {
  if (window.history.pushState) {
    queryString.stringify({ [key]: undefined });
  } else {
    console.warn('Current browser does not support history API! Unable to add query-string to url.');
  }
}

export default removeQueryString;
