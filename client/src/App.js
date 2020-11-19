import React from 'react'
import Map from './components/Map'
import Sighnup from "./components/Sighnup";
import { Container } from "react-bootstrap";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from  "./components/Login"
import UpdateProfile from "./components/UpdateProfile"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "auto" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Sighnup} />
              <Route path="/login" component={Login} />
              <Route path="/update-profile" component={UpdateProfile} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Map}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;