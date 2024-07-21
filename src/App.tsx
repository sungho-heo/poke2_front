import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";

// queryClient type지정
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
      font-family: 'Noto Sans', 'Noto Sans KR', 'Apple SD Gothic Neo', '맑은 고딕', sans-serif;
      margin: 0;
  }

  :root{
    margin: 0 auto;
    text-align: center;
    line-height: 1.5;
    font-weight: 400;
    font-size: 16px;

    color-scheme: light dark;
    color: #010100;
    background-color: #FEFEFF;
  }

  a {
    color: black;
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
`;

export default App;
