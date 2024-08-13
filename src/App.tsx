import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState } from "react";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import { lightTheme, darkTheme } from "./themes";

const App: React.FC = () => {
  // 테마설정
  const [theme, setTheme] = useState(lightTheme);

  // 알림메세지
  const [notification, setNotification] = useState<string | null>(null);

  // queryClient type지정
  const queryClient = new QueryClient();

  // handler
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const handleNotification = () => {
    setNotification(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <AuthProvider>
            <Header toggleTheme={toggleTheme} />
            {notification && (
              <Notification
                message={notification}
                onClose={handleNotification}
              />
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={<Login showNotification={showNotification} />}
              />
              <Route
                path="/signup"
                element={<Signup showNotification={showNotification} />}
              />
              <Route path="/pokemon/:name" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
      font-family: 'Noto Sans', 'Noto Sans KR', 'Apple SD Gothic Neo', '맑은 고딕', sans-serif;
      margin: 0;
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.textColor}
      transition: background-color 0.3s ease, color 0.3s ease;
  }

  :root{
    margin: 0 auto;
    text-align: center;
    line-height: 1.5;
    font-weight: 400;
    font-size: 16px;
  }

  a {
    color: ${({ theme }) => theme.textColor}
    font-weight: 500;
    text-decoration-line: none;    
  }
  a:hover {
    color: #535bf2;
  }

  ul{
    display: inline-flex;
    align-items: center;
    justfy-content: center;
  }
  *{
      box-sizing: border-box;
  }
label {
    margin-bottom: 0;
    cursor: pointer;
}
  li{
    list-style: none;
  }
  form{
      margin: 0;
      padding: 0;
  }

  h2{
    color: ${({ theme }) => theme.textColor};
  }

  h3{
    font-size: 45px;
    font-weight: 700;
    line-height: 1.2;
  }

  h4{
    font-size: 16px;
    font-weight: 500;
    color: #858585;
    line-height: 1.2;
    margin-bottom: 5px;
  }
`;

export default App;
