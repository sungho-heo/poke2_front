import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchFav } from "../api/fav";

// type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => Promise<void>;
  logout: (showNotification?: (message: string) => void) => void;
  fav: string[];
  setFav: (fav: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// authProvider는 로그인, 로그아웃시 알림을 알려주는것
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [fav, setFav] = useState<string[]>([]);

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
    try {
      const fetchedFav = await fetchFav(token);
      setFav(fetchedFav);
    } catch (err) {
      console.error("Failed to fetch fav on login", err);
    }
  };

  const logout = (showNotification?: (meesage: string) => void) => {
    setToken(null);
    setFav([]);
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

    // fav불러오기
    const loadFav = async () => {
      if (token) {
        try {
          const fetchedFav = await fetchFav(token);
          setFav(fetchedFav);
        } catch (err) {
          console.error("Failed to fetch fav", err);
        }
      } else {
        setFav([]);
      }
    };

    checkToken();
    loadFav();

    const intervalId = setInterval(checkToken, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, login, logout, fav, setFav }}
    >
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
