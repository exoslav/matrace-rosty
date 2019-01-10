export const fetcher = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
};
