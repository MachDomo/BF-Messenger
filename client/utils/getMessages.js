export default (callback) => {
  fetch('http://127.0.0.1:1337/messages', {
    method: 'GET',
    mode: 'cors'
  })
    .then((res) => {
      console.log(res);
      callback(res);
    })
    .catch((error) => {
      console.log('there has been a problem with your fetch: ', error.message);
    });
};
