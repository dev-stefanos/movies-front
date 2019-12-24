import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class AddMovieButton extends Component {

    render() {
        return (
            <Button variant="contained" color="primary" fullWidth href="/addMovie">
                Add Movie
            </Button>
        );
    }

}

export default AddMovieButton;