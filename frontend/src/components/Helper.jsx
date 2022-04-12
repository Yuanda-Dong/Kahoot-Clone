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

/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}
