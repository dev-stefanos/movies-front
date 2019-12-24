import React from 'react';
import { Router } from 'react-router-dom';
import { progressBarFetch, setOriginalFetch } from 'react-fetch-progressbar';

import history from './services/history';
import Routes from './routes';

setOriginalFetch(window.fetch); 
window.fetch = progressBarFetch;

function App() {
    return (
        <Router history={history}>
            <Routes />
        </Router>
    );
}

export default App;