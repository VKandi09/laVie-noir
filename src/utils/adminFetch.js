import { logoutAdmin } from "./auth";

export async function adminFetch(url, options = {}) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    logoutAdmin();
    throw new Error("Unauthorized");
  }

  return res;
}
