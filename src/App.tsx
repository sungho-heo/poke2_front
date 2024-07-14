import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./components/Home";
import Detail from "./components/Detail";

// queryClient type지정
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Link to="/">
          <Title src="./main.png" alt="Home" />
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

// css
const Title = styled.img`
  height: 180px;
  width: 180px;
`;
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

    color-scheme: light dark;
    color: #010100;
    background-color: #FEFEFF;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }
`;

export default App;
