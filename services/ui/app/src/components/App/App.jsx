import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HmsProvider } from '../../contexts/HmsContext';
import HmsHeader from '../HmsHeader';
import HmsNotFound from '../HmsNotFound';
import HmsHome from '../HmsHome';
import HmsLogin from '../HmsLogin';
import HmsFooter from '../HmsFooter';
import './App.scss';
import Form from '../Form';
const App = props => (
    <Router>
        <HmsProvider>
            <CssBaseline />
            <HmsHeader />
            <main className="hms-main">
                <Switch>
                    <Route exact path="/" component={HmsHome} />
                    <Route exact path="/login" component={HmsLogin} />
                    <Route exact path="/my-form" component={Form} />
                    <Route component={HmsNotFound} />
                </Switch>
            </main>
            <HmsFooter />
        </HmsProvider>
    </Router>
    
);

export default App;
