import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./components/Home";

// queryClient type지정
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Title src="./main.png"></Title>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
