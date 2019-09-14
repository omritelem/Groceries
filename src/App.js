import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AuthProvider from './Hooks/UseAuthProvider';
import PrivateRoute from './components/privateRoute';
import Home from './views/Home/Home';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import NotFound from './views/NotFound/NotFound';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Switch>
                        <PrivateRoute exact path='/' component={ Home }></PrivateRoute>
                        <Route exact path='/signin' component={ SignIn }></Route>
                        <Route exact path='/signup' component={ SignUp }></Route>
                        <Route component={ NotFound }/>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
