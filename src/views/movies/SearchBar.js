import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

class SearchBar extends Component {

    render() {
        return (
            <TextField 
                label="Search..." 
                variant="outlined" 
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }} 
                onChange={this.props.onChange} />
        );
    }

}

export default SearchBar;