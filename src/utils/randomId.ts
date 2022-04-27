export function randomId() {
  const min = Math.ceil(10000);
  const max = Math.floor(99999);
  return Math.floor(Math.random() * (max - min)) + min;
}