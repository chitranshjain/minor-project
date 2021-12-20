import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/chat/:userId" exact component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
