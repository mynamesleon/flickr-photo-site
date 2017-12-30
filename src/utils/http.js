import axios from "axios";
import lscache from "lscache";
import flickrdata from "../flickrdata";

const dev = process.env.NODE_ENV === "development";
flickrdata.CACHE_DURATION = parseFloat(flickrdata.CACHE_DURATION) || 20;

if (!flickrdata.API_KEY) {
  throw new Error("Please include a Flickr API key");
}

if (!flickrdata.USER_ID) {
  throw new Error("Please include a Flickr user ID");
}

export default class HTTP {
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

  get(url, options = {}, session = true) {
    return new Promise((resolve, reject) => {
      const storage = sessionStorage;
      const fullUrl =
        url + this.encodeOptions(Object.assign({}, flickrdata, options));
      let cachedData;

      // always make full requests in dev/test
      if (!dev) {
        if (session && storage) {
          // better safe than sorry
          try {
            cachedData = JSON.parse(storage.getItem(fullUrl));
          } catch (err) {
            storage.removeItem(fullUrl);
          }
        }
        if (!cachedData) {
          cachedData = lscache.get(fullUrl);
        }
      }

      if (cachedData) {
        resolve(cachedData);
        return;
      }

      this.cancel(url);
      this.cancelTokens[url] = axios.CancelToken.source();

      axios
        .get(fullUrl, {
          cancelToken: this.cancelTokens[url].token
        })
        .then(response => {
          this.cancelTokens[url] = null;
          if (session && storage && !dev) {
            storage.setItem(fullUrl, JSON.stringify(response));
          }
          lscache.set(fullUrl, response, flickrdata.CACHE_DURATION || 20);
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
