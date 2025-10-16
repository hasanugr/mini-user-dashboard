export function filterUsers(users, q) {
  if (!q) return users;
  const ql = q.toLowerCase();
  return users.filter(
    (u) =>
      u.name.toLowerCase().includes(ql) ||
      u.username.toLowerCase().includes(ql) ||
      u.email.toLowerCase().includes(ql) ||
      u.phone.toLowerCase().includes(ql) ||
      u.company?.name?.toLowerCase().includes(ql)
  );
}

export function paginateUsers(users, page = 1, pageSize = 5) {
  const p = Number(page);
  const ps = Number(pageSize);
  const start = (p - 1) * ps;
  const end = start + ps;
  const pageItems = users.slice(start, end);
  const total = users.length;

  return { pageItems, total };
}
