import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from "./components/Project/AddProject";

import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/addProject" component={AddProject} />

                    {/* <Redirect to="/dashboard" /> */}
                </div>
            </Router>
        </Provider>
    );
}

export default App;
