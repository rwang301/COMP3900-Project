export default class API {
  /**
   * @param {String} url
   */
  constructor(url, setAlert) {
    this.url = url;
    this.setAlert = setAlert;
  }

  /**
   * Make a request to `path` with `options` and parse the response as `JSON`.
   * @param {String} path The url to make the request to.
   * @param {Object} options Additional options to pass to fetch.
   * @returns `JSON` or `undefined` when error occurs.
   */
  async makeAPIRequest(path, options) {
    try {
      const res = await fetch(`${this.url}/${path}`, options);
      const json = await res.json();
      return res.ok ? json : this.setAlert({ open: true, severity: 'error', message: json.error }); // implicit error
    } catch (error) {
      // explicit error
      this.setAlert({ open: true, severity: 'error', message: error.message });
    }
  }

  /**
   * Depending on the given method, send a request to the server,
   * by default if no method specified a GET request will be sent.
   * @param {String} path backend route.
   * @param {String} method HTTP request method.
   * @param {Object} data payload.
   */
  async fetch(path, method = 'get', data) {
    return this.makeAPIRequest(path, {
      method,
      headers: {
        'Content-type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    });
  }
}

export const API_URL = 'http://localhost:8000';