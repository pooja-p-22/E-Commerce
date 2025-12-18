import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const Page = styled.div`
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)),
              url("/Login.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;   
  display: flex;                  
  align-items: center;
  justify-content: center;
`;


// const Wrapper = styled.div`
//   margin-top: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 3rem 1.5rem;
// `;

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;   /* 420–480 depending on page, pick one */
  padding: 0 1.5rem;
  margin-top: 80px;   /* space for navbar */
`;


const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.96);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  padding: 2.5rem 2.25rem;
  backdrop-filter: blur(12px);

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 0.25rem;
  color: #2c3e50;
`;

const Subtitle = styled.p`
  margin: 0 0 2rem;
  color: #7f8c8d;
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #34495e;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1.8px solid #dde4ec;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #4c8bf5;
    box-shadow: 0 0 0 3px rgba(76,139,245,0.18);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0;
`;

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.95rem 1rem;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: #ffffff;
  transition: background 0.25s ease, transform 0.1s ease;

  &:hover {
    background: linear-gradient(45deg, #219150, #27ae60);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Helper = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // integrate real auth here
    console.log("Login data:", form);
  };

  return (
    <Page>
      <Navbar />
      <Wrapper>
        <Card>
          <Title>Welcome back</Title>
          <Subtitle>Login to continue shopping with FreshCart.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Row>
              <CheckboxRow>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </CheckboxRow>
              <LinkButton type="button">Forgot password?</LinkButton>
            </Row>

            <SubmitButton type="submit">Login</SubmitButton>
          </Form>

          <Helper>
            New to FreshCart?{" "}
            <LinkButton type="button">Create an account</LinkButton>
          </Helper>
        </Card>
      </Wrapper>
    </Page>
  );
};

export default Login;
