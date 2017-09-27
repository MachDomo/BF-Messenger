export default (message, url, callback) => {
  // Message = {username: '', message: ''}
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(message),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };
  url = 'http://127.0.0.1:1337' + url;

  fetch(url, fetchData)
    .then((res) => res.json())
    .then((data) => {
      console.log("Post success", data);
      callback(data);
    })
    .catch((error) => {
      console.log('there has been a problem with your fetch: ', error.message);
    });
}
