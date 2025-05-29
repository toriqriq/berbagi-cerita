import CONFIG from "../config";

const Auth = {
  async login({ email, password }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, message: result.message };
      }

      // Simpan token & status login jika diperlukan
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", result.loginResult.token);

      return { success: true };
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan jaringan." };
    }
  },

  async register({ name, email, password }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, message: result.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: "Terjadi kesalahan jaringan." };
    }
  },

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
  },

  isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  },
};

export default Auth;
