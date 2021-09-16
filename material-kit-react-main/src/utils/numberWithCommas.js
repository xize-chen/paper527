export default function numberWithCommas(x) {
  if (x === undefined) return '0';
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
