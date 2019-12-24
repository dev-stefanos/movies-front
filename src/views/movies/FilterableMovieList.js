import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { ProgressBar } from 'react-fetch-progressbar';

import AddMovieButton from './AddMovieButton';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import AlertDialog from '../common/AlertDialog';

class FilterableMovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            currentMovie: null,
            allMovies: [],
            movies: [],
            mustRedirect: false,
            alertDialogOpen: false,
            alertDialogTitle: '',
            alertDialogContent: ''
        };
        this.LIST_HEIGHT = 620;
        this.onMovieSelected = this.onMovieSelected.bind(this);
        this.onQueryChange = this.onQueryChange.bind(this);
        this.onAlertDialogClose = this.onAlertDialogClose.bind(this);
        this.detailsRef = React.createRef();
    }

    onAlertDialogClose() {
        this.setState({ alertDialogOpen: false });
    }

    onMovieSelected(movie) {
        this.setState({ currentMovie: movie });
        this.scrollToRef(this.detailsRef);
    }

    onQueryChange(e) {
        this.setState({
            query: e.target.value,
            movies: this.state.allMovies.filter(movie => { return movie.title.toLowerCase().includes(e.target.value.toLowerCase()); })
        });
    }

    componentDidMount() {
        let _this = this;
        const url = process.env.REACT_APP_GET_MOVIES;
        fetch(url).then(res => res.json()).then((data) => {
            this.setState({ 
                allMovies: data,
                movies: data.filter(movie => { return movie.title.toLowerCase().includes(this.state.query.toLowerCase()); }),
                mustRedirect: (data.length===0)
            }, function() {
                if (this.props.params.movieId) {
                let movieId = parseInt(this.props.params.movieId);
                    for (var i=0; i<this.state.allMovies.length; i++) {
                        var currMovie = this.state.allMovies[i];
                        if (currMovie.movieId===movieId) {
                            this.setState({ currentMovie: currMovie });
                            break;
                        }
                    }
                }
            });
        })
        .catch(function(error) {
            console.error(error);
            _this.setState({ alertDialogOpen: true, alertDialogTitle: 'Error', alertDialogContent: 'Failed to retrieve movies!' });
        });
    }

    scrollToRef(ref) {
        window.scrollTo(0, ref.current.offsetTop);
    } 

    render() {
        if (this.state.mustRedirect) {
            return (
                <Redirect to='/addMovie' />
            );
        }

        return (
            <Container maxWidth="md" className="movies-container">
                <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={2} >
                                <AddMovieButton />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <SearchBar query={this.state.query} onChange={this.onQueryChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <MovieList movies={this.state.movies} onMovieSelected={(movie) => this.onMovieSelected(movie)} height={this.LIST_HEIGHT} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div ref={this.detailsRef} style={{height: this.LIST_HEIGHT+'px'}}>
                                    <MovieDetails currentMovie={this.state.currentMovie} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <AlertDialog 
                    alertDialogOpen={this.state.alertDialogOpen} 
                    onAlertDialogClose={this.onAlertDialogClose} 
                    title={this.state.alertDialogTitle} 
                    content={this.state.alertDialogContent} 
                />
                <ProgressBar />
            </Container>
        );
    }

}

export default FilterableMovieList;