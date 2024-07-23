import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => Promise<void>;
  logout: (showNotification?: (message: string) => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const timeLimit = new Date().getTime() + 60 * 60 * 1000; // 1시간후 만료.
      localStorage.setItem("tokenLimit", timeLimit.toString());
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenLimit");
    }
  }, [token]);

  const login = async (token: string) => {
    setToken(token);
  };

  const logout = (showNotification?: (meesage: string) => void) => {
    setToken(null);
    if (showNotification) {
      showNotification("Logout successful!");
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const timeLimit = localStorage.getItem("tokenLimit");
      if (timeLimit && new Date().getTime() > Number(timeLimit)) {
        logout();
      }
    };
    checkToken();

    const intervalId = setInterval(checkToken, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
