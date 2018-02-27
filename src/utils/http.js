import axios from "axios";
import flickroptions from "../flickroptions";

class HTTP {
  constructor() {
    this.cancelTokens = {};
  }

  encodeOptions(obj) {
    let str = "";
    for (let key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return "?" + str;
  }

  get(url, opts = {}, session = true) {
    return new Promise((resolve, reject) => {
      const options = Object.assign({}, opts);
      const fullUrl = url + this.encodeOptions(options);

      this.cancel(url);
      this.cancelTokens[url] = axios.CancelToken.source();

      axios
        .get(fullUrl, {
          cancelToken: this.cancelTokens[url].token
        })
        .then(response => {
          this.cancelTokens[url] = null;
          resolve(response);
        })
        .catch(err => {
          this.cancelTokens[url] = null;
          if (!axios.isCancel(err)) {
            reject(err);
          }
        });
    });
  }

  cancel(url) {
    let c = this.cancelTokens;

    // cancel specific if a url is provided
    if (url && c[url]) {
      if (typeof c[url].cancel === "function") {
        c[url].cancel();
      }
      c[url] = null;
      return;
    }

    // cancel all
    if (url === undefined) {
      for (let i in c) {
        if (c[i]) {
          this.cancel(i);
        }
      }
    }
  }
}

export default new HTTP();
