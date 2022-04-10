// Make api call to backend with given route, method and request body
export const apiCall = async (path, method, content) => {
  // return new Promise((resolve, reject) => {
  const init = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        path === 'admin/auth/register' ||
        path === 'admin/auth/login' ||
        path.includes('play')
          ? undefined
          : 'Bearer ' + localStorage.getItem('token')
    },
    body: method === 'GET' ? undefined : JSON.stringify(content)
  };
  const res = await fetch(`http://localhost:5005/${path}`, init);
  const body = await res.json();
  if (body.error) {
    console.log(body.error);
    // await showErrorModal(body.error);
    return body.error;
  } else {
    return body;
  }
  // });
};
