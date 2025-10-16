const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchUsers({ signal } = {}) {
  const res = await fetch(`${BASE}/users`, {
    signal,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function fetchUser(id, { signal } = {}) {
  const res = await fetch(`${BASE}/users/${id}`, {
    signal,
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return res.json();
}

export async function createUser(payload) {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
  }
  return res.json();
}

export async function editUser(id, payload) {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to edit user");
  }
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
  return true;
}
