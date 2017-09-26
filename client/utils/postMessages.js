export default (message, callback) => {
  // Message = {username: '', message: ''}
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(message),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };
  let url = 'http://127.0.0.1:1337/messages';

  fetch(url, fetchData)
    .then((res) => {
      console.log("Post success");
      callback();
    })
    .catch((error) => {
      console.log('there has been a problem with your fetch: ', error.message);
    });
}
