import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends Component {

    render() {
        return (
            <Dialog 
                open={this.props.alertDialogOpen}
                onClose={this.props.onAlertDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{this.props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onAlertDialogClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AlertDialog;