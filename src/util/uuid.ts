let count = 0;

export function uuid() {
  const res = count.toString();
  count += 1;
  return res.concat(Math.random().toFixed(5).split(".")[1]);
}
