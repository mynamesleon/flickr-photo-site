let url = "https://farm{f}.staticflickr.com/{s}/{i}_{se}_{size}.jpg";

export default (f, s, i, se, size) => {
  let u = url;
  let p = { f, s, i, se, size };
  for (let e in p) {
    u = u.replace("{" + e + "}", p[e]);
  }
  return u;
};
