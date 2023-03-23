let count = 0.0;

export function uuid() {
  const res = count.toFixed(8).split(".")[1];
  count += 0.00000001;
  if (count >= 1.0) count = 0.0;
  return res.concat(Math.random().toFixed(8).split(".")[1]);
}
