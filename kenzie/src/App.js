import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {

  const [authentication, setAuthentication] = useState(false)
  const [data, setData] = useState([""])

  return (
    <div className="App">
      <ToastContainer/>
      <Switch>
        <Route exact path="/">
          <Login setAuthentication = {setAuthentication} setData = {setData}/>
        </Route>
        <Route exact path="/signup">
          <Signup setData = {setData} setAuthentication = {setAuthentication}/>
        </Route>
        <Route exact path="/:name">
          <Dashboard authentication = {authentication} data = {data} setData = {setData}/>
        </Route>
      </Switch>
    </div>
  );
}
export default App;
