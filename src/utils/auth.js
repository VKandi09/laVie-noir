export function logoutAdmin() {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
}