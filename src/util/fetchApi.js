const fetchApi = (url, data, type) => {
  const option = {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (type === 'POST') {
    option.body = JSON.stringify(data);
  }

  return fetch(url, option).then((response) => {
    return response.json()
  }).then((resData) => {
    return resData;
  }).catch(err => {
    return err;
  });
};

export const get = (url = '', body = {}) => {
  return fetchApi(url, body, 'GET');
};

export const post = (url = '', body = {}) => {
  return fetchApi(url, body, 'POST');
};

export default {
  get,
  post
};
