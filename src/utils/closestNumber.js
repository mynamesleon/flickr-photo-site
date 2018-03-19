export default (num, arr) => {
  let length = arr.length;
  let curr = arr[length - 1];
  let abs = Math.abs;
  while (length--) {
    let val = arr[length];
    if (abs(num - val) < abs(num - curr)) {
      curr = val;
    }
  }
  return curr;
};
