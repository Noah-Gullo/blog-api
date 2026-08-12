export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export async function checkLogin() {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      return null;
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Failed to verify login:", error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}