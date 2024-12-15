import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IKImage } from "imagekitio-react";
import {
  authSection as LoginSection,
  Logo2,
  TitileContainer,
  FormContainer,
  Input,
  Label,
  FormGroup,
  Button,
} from "../styles/CommonStyles";
import { apiLogin, LoginParams, AuthResponse } from "../api/auth";
import { fetchFav } from "../api/fav";
import { useAuth } from "../context/AuthContext";

// type

export interface NotificationProps {
  showNotification: (message: string) => void;
}

const Login: React.FC<NotificationProps> = ({ showNotification }) => {
  const { login, setFav } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // backend frontend connect data
  const mutation = useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: apiLogin,
    onSuccess: async (data) => {
      // token 만료전까지 저장하기
      localStorage.setItem("token", data.token);

      // 유저의 즐겨찾기 포켓몬 데이터 가져옴. 있을경우.
      const favData = await fetchFav(data.token);

      // 가져온 데이터 임시저장 데이터저장소
      setFav(favData);

      // 로그인 성공하면 home으로
      login(data.token);
      navigate("/");
      showNotification("Login successful!");
    },
  });

  // login 성공시 handle.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };
  return (
    <LoginSection>
      <TitileContainer>
        <Logo2>
          <IKImage
            path="/main.png"
            alt="Login"
            transformation={[{ height: "200", width: "200", format: "webp" }]}
          />
        </Logo2>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="Email">Email </Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Password"> Password </Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Login</Button>
          </form>
          {mutation.isError && <p>Error: {mutation.error.message}</p>}
        </FormContainer>
      </TitileContainer>
    </LoginSection>
  );
};

export default Login;
