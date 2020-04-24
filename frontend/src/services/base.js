import Axios from 'axios';

export function api(resource) {
  const domain = process.env.API_ROOT_URL || '/api/';
  return `${domain}${resource}`;
}

export async function getData(url, options = null) {
  return Axios.get(url, options);
}

export async function postData(url, data = {}) {
  return Axios.post(url, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function putData(url, data = {}) {
  return Axios.put(url, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteData(url) {
  return Axios.delete(url);
}
