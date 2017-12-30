export default (id, photoset) => {
  if (id && photoset && photoset.photo) {
    for (let i = 0, p = photoset.photo, l = p.length; i < l; i += 1) {
      if (p[i].id === id) {
        return p[i];
      }
    }
  }
  return {};
};
