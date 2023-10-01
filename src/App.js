import logo from './logo.svg';
import './RegisterAccout/RegisterAccout.css'
import RegisterPage from './RegisterAccout/RegisterAccout';
import LoginPage from './Login/Login';
import './Login/Login.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
