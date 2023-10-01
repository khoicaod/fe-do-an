// import logo from './logo.svg';
// import './RegisterAccout/RegisterAccout.css'
// import RegisterPage from './RegisterAccout/RegisterAccout';
// import LoginPage from './Login/Login';
// import './Login/Login.css'
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './RegisterAccout/RegisterAccout';
import SignIn from './Login/Login';




function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
