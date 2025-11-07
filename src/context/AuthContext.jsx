import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Checking if the user is already logged in or not
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await fetch(`${backendUrl}/api/auth/verifyToken`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setUser(null);
            localStorage.removeItem("authToken");
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [backendUrl]);

  const login = async (username, password) => {
    try {
      setError(null);

      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 401) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Invalid credentials";
        setError({ error: errorMessage });
        return { success: false, error: errorMessage };
      }

      if (response.status === 422) {
        const errorData = await response.json();
        console.log("Login 422 errors:", errorData.errors);
        setError({ errors: errorData.errors });
        return { 
          success: false, 
          validationErrors: errorData.errors
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Login failed";
        setError({ error: errorMessage });
        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      setUser(data.user);

      return { success: true };
    } catch (err) {
      console.error("Login catch error:", err);
      const errorMessage = err.message || "An error occurred during login";
      setError({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setError(null);
  };

  const register = async (username, password, email, gender) => {
    try {
      setError(null);

      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, gender }),
      });

      if (response.status === 422) {
        const errorData = await response.json();
        console.log("Register 422 errors:", errorData.errors);
        setError({ errors: errorData.errors });
        return { 
          success: false, 
          validationErrors: errorData.errors
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Registration failed";
        setError({ error: errorMessage });
        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      setUser(data.user);

      return { success: true };
    } catch (err) {
      console.error("Register catch error:", err);
      const errorMessage = err.message || "An error occurred during registration";
      setError({ error: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
