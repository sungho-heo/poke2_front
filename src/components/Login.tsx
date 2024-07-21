import React, { useState } from "react";
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

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login 성공시 handle.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <LoginSection>
      <TitileContainer>
        <Logo2 src="./main.png" alt="Login" />
        <FormContainer>
          <form>
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
        </FormContainer>
      </TitileContainer>
    </LoginSection>
  );
};

export default Login;
