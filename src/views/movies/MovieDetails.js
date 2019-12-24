import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

class MovieDetails extends Component {

    render() {
        let movie = this.props.currentMovie;
        return (
            <Paper className="wh">
                { 
                    movie ?
                    <Grid container direction="column" justify="space-between" alignItems="stretch" className="movies-details">
                        <Grid item  className="ww">
                            <Typography variant="h5">
                                <Box textAlign="center">{movie.title}</Box>
                            </Typography> 
                        </Grid>
                        <Grid item xs={7} className="ww">
                            <Box component="p" textAlign="justify" fontSize={16}>{movie.description}</Box>
                        </Grid>
                        <Grid item xs={2} className="ww">
                            <Box component="p">Directed by: <br /><Box component="span" fontWeight="fontWeightMedium">{movie.director}</Box></Box>
                        </Grid>
                    </Grid>
                    :
                    <Grid container direction="row" justify="center" alignItems="center" className="movies-details">
                        <Grid item>
                            <Box component="p" fontWeight="fontWeightMedium">No movie selected</Box>
                        </Grid>
                    </Grid>
                }
            </Paper>
        );
    }
}

export default MovieDetails;