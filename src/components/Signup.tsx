import React, { useState } from "react";
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

const Signup: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      return;
    }
  };
  return (
    <SignupSection>
      <TitileContainer>
        <Logo2 src="./main.png" alt="Signup" />
        <FormContainer>
          <form>
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
        </FormContainer>
      </TitileContainer>
    </SignupSection>
  );
};

export default Signup;
