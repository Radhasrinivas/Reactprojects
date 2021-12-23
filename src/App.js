import './App.css';
import { BrowserRouter as Router, Switch, Route }
from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import Editprofile from './Editprofile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
     <Route path="/Profile">
     <Profile />
     </Route>
     <Route path="/Editprofile">
     <Editprofile />
     </Route>
     <Route path="/Login">
     <Login />
     </Route>
     <Route path="/">
     <SignUp />
     </Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
