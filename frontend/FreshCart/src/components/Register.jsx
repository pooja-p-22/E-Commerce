import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

const Page = styled.div`
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)),
              url("/Register.jpg");
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
  max-width: 460px;
  background: rgba(255,255,255,0.97);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.18);
  padding: 2.5rem 2.25rem;

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
    border-color: #ff6b6b;
    box-shadow: 0 0 0 3px rgba(255,107,107,0.18);
  }
`;

const Select = styled.select`
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1.8px solid #dde4ec;
  font-size: 0.95rem;
  outline: none;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #ff6b6b;
    box-shadow: 0 0 0 3px rgba(255,107,107,0.18);
  }
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  background: linear-gradient(45deg, #ff6b6b, #f39c12);
  color: #ffffff;
  transition: background 0.25s ease, transform 0.1s ease;

  &:hover {
    background: linear-gradient(45deg, #e65555, #e67e22);
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

const ErrorMessage = styled.div`
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background-color: #fee;
  color: #c00;
  border: 1px solid #fcc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background-color: #efe;
  color: #060;
  border: 1px solid #cfc;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError("");
    setSuccess("");

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await register(form.name, form.email, form.password, form.role);
      setSuccess("Account created successfully! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setLocalError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => navigate("/login");

  return (
    <Page>
      <Navbar />
      <Wrapper>
        <Card>
          <Title>Create account</Title>
          <Subtitle>Fresh groceries. Zero hassle.</Subtitle>
          {(localError || error) && (
            <ErrorMessage>{localError || error}</ErrorMessage>
          )}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <Form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

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
              <Label htmlFor="role">Account Type</Label>
              <Select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </Select>
            </div>

            <Row2>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </Row2>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </SubmitButton>
          </Form>

          <Helper>
            Already have an account?{" "}
            <button onClick={handleLoginClick} style={{
              background: "none",
              border: "none",
              color: "#ff6b6b",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}>
              Login here
            </button>
          </Helper>
        </Card>
      </Wrapper>
    </Page>
  );
};

export default Register;
