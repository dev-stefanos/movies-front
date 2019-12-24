import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

import FilterableMovieList from './FilterableMovieList';
import ApplicationBar from '../common/ApplicationBar';

class Movies extends Component {
    
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <ApplicationBar title="Movies" />
                <FilterableMovieList params={this.props.match.params} />
            </React.Fragment>
        );
    }

}

export default Movies;