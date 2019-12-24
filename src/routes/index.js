import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Movies from '../views/movies/Movies';
import AddMovie from '../views/addMovie/AddMovie';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Movies} />
            <Route path="/movies/:movieId?" component={Movies} />
            <Route path="/addMovie" component={AddMovie} />
        
            <Route component={Movies} />
        </Switch>
    );
}