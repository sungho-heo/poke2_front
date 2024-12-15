import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IKImage } from "imagekitio-react";
import {
  authSection as SignupSection,
  Logo2,
  TitileContainer,
  FormContainer,
  Input,
  Label,
  FormGroup,
  Button,
} from "../styles/CommonStyles";
import { apiSignup, SignupParams, AuthResponse } from "../api/auth";
import { NotificationProps } from "./Login";
import { useAuth } from "../context/AuthContext";

const Signup: React.FC<NotificationProps> = ({ showNotification }) => {
  const { login } = useAuth();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  // backend frontend connect data;
  const mutation = useMutation<AuthResponse, Error, SignupParams>({
    mutationFn: apiSignup,
    onSuccess: (data) => {
      login(data.token);
      showNotification("Signup successful!");
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      showNotification("Passwords do not match");
      return mutation.isError && <p>Error: {mutation.error.message}</p>;
    }
    mutation.mutate({ nickname, email, password });
  };
  return (
    <SignupSection>
      <TitileContainer>
        <Logo2>
          <IKImage
            path="/main.png"
            alt="Signup"
            transformation={[{ height: "200", width: "200", format: "webp" }]}
          />
        </Logo2>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="Nickname">Nickname</Label>
              <Input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Password2">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Signup</Button>
          </form>
          {mutation.isError && <p>Error: {mutation.error.message}</p>}
        </FormContainer>
      </TitileContainer>
    </SignupSection>
  );
};

export default Signup;
