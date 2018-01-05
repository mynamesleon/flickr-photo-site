import axios from "axios";
import flickrdata from "../flickrdata";

const dev = process.env.NODE_ENV === "development";
flickrdata.CACHE_DURATION = parseFloat(flickrdata.CACHE_DURATION) || 20;

const dataToUse = {
  API_KEY: flickrdata.API_KEY,
  USER_ID: flickrdata.USER_ID,
  CACHE_DURATION: !dev ? flickrdata.CACHE_DURATION : 0.0016 // 10 second cache in dev
};

if (!dataToUse.API_KEY) {
  throw new Error("Please include a Flickr API key");
}

if (!dataToUse.USER_ID) {
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

  get(url, opts = {}, session = true) {
    return new Promise((resolve, reject) => {
      const storage = sessionStorage;
      const options = Object.assign({}, dataToUse, opts);
      const fullUrl = url + this.encodeOptions(options);
      let cachedData;

      // always make full requests in dev/test
      if (session && storage && !dev) {
        // better safe than sorry
        try {
          cachedData = JSON.parse(storage.getItem(fullUrl));
        } catch (err) {
          storage.removeItem(fullUrl);
        }
      }

      // do not use session or locally stored data if the response was false
      if (
        cachedData &&
        cachedData.data !== false &&
        typeof cachedData.data !== "string"
      ) {
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
          resolve(response);

          // if the response is false, do not store it locally or in the session
          if (
            session &&
            storage &&
            !dev &&
            response.data !== false &&
            typeof response.data !== "string"
          ) {
            storage.setItem(fullUrl, JSON.stringify(response));
          }
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
