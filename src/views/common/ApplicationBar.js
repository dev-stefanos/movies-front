import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class ApplicationBar extends Component {

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">{this.props.title}</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default ApplicationBar;