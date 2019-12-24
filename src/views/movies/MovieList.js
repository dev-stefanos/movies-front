import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

class MovieList extends Component {

    renderRow(props) {
        let movie = props.data.movies[props.index];
        let cb = props.data.onMovieSelected;
        return (
            <ListItem button divider style={props.style} key={props.index} onClick={() => cb(movie)}>
                <ListItemText primary={movie.title} secondary={movie.released} />
            </ListItem>
        );
    }  

    render() {
        return (
            (this.props.movies.length > 0) ?
            <FixedSizeList height={this.props.height} itemSize={70} itemCount={this.props.movies.length} itemData={{ movies: this.props.movies, onMovieSelected: this.props.onMovieSelected }}>
                {this.renderRow}
            </FixedSizeList>
            :
            <Grid container direction="row" justify="center" alignItems="center" style={{height: this.props.height + 'px'}}>
                <Grid item>
                    <Box component="p" fontWeight="fontWeightMedium">No movies found!</Box>
                </Grid>
            </Grid>
        );
    }

}

export default MovieList;