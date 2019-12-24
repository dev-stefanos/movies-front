import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { ProgressBar } from 'react-fetch-progressbar';

import AlertDialog from '../common/AlertDialog';
import ApplicationBar from '../common/ApplicationBar';

class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.years = this.getYearsUpToNow(1900);
        this.state = {
            formData: {
                movieId: 0,
                title: '',
                director: '',
                released: this.years[0],
                description: ''
            },
            adding: false,
            mustRedirect: false,
            alertDialogOpen: false,
            alertDialogTitle: '',
            alertDialogContent: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onAlertDialogClose = this.onAlertDialogClose.bind(this);
    }

    onAlertDialogClose() {
        this.setState({ alertDialogOpen: false });
    }

    getYearsUpToNow(startYear) {
        let years = [];
        let today = parseInt(new Date().getFullYear());
        for (var i = today; i >= 1900; i--) {
            years.push(i);
        }
        return years;
    }

    onInputChange(e) {
        let formData = Object.assign({}, this.state.formData);
        formData[e.target.name] = e.target.value;
        this.setState({ formData: formData });
    }

    submitForm() {
        const url = process.env.REACT_APP_ADD_MOVIE;
        let _this = this;
        this.setState({ adding: true });
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.formData)
        }).then(res => res.json()).then((data) => {
            if (data.movieId>0) {
                this.setState({ 
                    mustRedirect: true,
                    formData: data 
                });
            } else {
                console.error('Back-end exception');
                _this.setState({ alertDialogOpen: true, alertDialogTitle: 'Error', alertDialogContent: 'Failed to add movie!' });        
            }
        }).catch(function(error) {
            console.error(error);
            _this.setState({ alertDialogOpen: true, alertDialogTitle: 'Error', alertDialogContent: 'Failed to add movie!' });
        }).finally(function() {
            _this.setState({ adding: false });
        });
    }
    
    render() {
        if (this.state.mustRedirect) {
            return (
                <Redirect to={'/movies/'+this.state.formData.movieId} />
            );
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <ApplicationBar title="Add Movie" />
                <Container maxWidth="sm" className="movies-container">
                    <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); this.submitForm(); } }>
                        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                            <Grid item xs={12}>
                                <TextField required id="title" name="title" label="Title" fullWidth inputProps={{ maxLength: 75 }} helperText="75 characters max" variant="outlined" onChange={this.onInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required id="director" name="director" label="Director" fullWidth inputProps={{ maxLength: 40 }} helperText="40 characters max" variant="outlined" onChange={this.onInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required select id="released" name="released" label="Release year" fullWidth defaultValue={this.years[0]} variant="outlined" className="top-margin" onChange={this.onInputChange}>
                                    {
                                        this.years.map(year => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required multiline id="description" name="description" label="Short description" fullWidth variant="outlined" rows="14" helperText="400 characters max" inputProps={{ maxLength: 400 }} onChange={this.onInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2}>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="secondary" fullWidth href="/movies" disabled={this.state.adding} >Cancel</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <   Button variant="contained" color="primary" fullWidth type="submit" disabled={this.state.adding}>Add</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                    <AlertDialog 
                        alertDialogOpen={this.state.alertDialogOpen} 
                        onAlertDialogClose={this.onAlertDialogClose} 
                        title={this.state.alertDialogTitle} 
                        content={this.state.alertDialogContent} 
                    />
                    <ProgressBar />
                </Container>
            </React.Fragment>
        );
    }

}

export default AddMovie;