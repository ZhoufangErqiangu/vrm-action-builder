export function save (_id: string | undefined) {
  if (!_id) return;
  localStorage.setItem("bookingId", _id);
}

export function load () {
  return localStorage.getItem("bookingId");
}
