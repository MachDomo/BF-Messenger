export default (callback) => {
  let url = 'http://127.0.0.1:1337/messages';

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      callback(data);
    })
    .catch((error) => {
      console.log('there has been a problem with your fetch: ', error.message);
    });
};
