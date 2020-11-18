import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
export default function Login() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError("failed to sign in");
      console.error(err);
    }
    setLoading(false);
  }

  async function handleGoogleAuth(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch (err) {
      setError("failed to sign in");
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">
              Login
            </Button>
            
            <Button style={{marginTop: "1.5rem"}} disabled={loading} onClick={handleGoogleAuth} type="submit" className="w-100">
              continue with google
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
      Forgot Password?<Link to="/forgot-password">Reset Password</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
