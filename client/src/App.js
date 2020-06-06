import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Container,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Response from './Response';

const styles = {
  container: {
    marginTop: '30px',
  },
  error: {
    backgroundColor: 'red',
  },
  textField: {
    marginBottom: '30px',
  },
  menuButton: {
    marginRight: '32px',
  },
  title: {
    flexGrow: 1,
  },
};

class App extends Component {
  state = {
    longurl: '',
    shorturl: '',
    isReturned: false,
    invalidUrl: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      invalidUrl: false,
    });
    const newItem = {
      longUrl: this.state.longurl,
    };
    axios
      .post('https://url-serv.herokuapp.com/api/url/shorten', newItem)
      .then((res) => this.onResponse(res))
      .catch((err) => this.errorHandler());
  };

  errorHandler = () => {
    this.setState({
      invalidUrl: true,
    });
  };

  onResponse = (res) => {
    this.setState({
      shorturl: res.data.shortUrl,
      isReturned: true,
    });
  };

  reset = () => {
    this.setState({
      longurl: '',
      shorturl: '',
      isReturned: false,
      invalidUrl: false,
    });
  };

  handleClose = () => {
    this.setState({ invalidUrl: false });
  };

  renderLanding = () => {
    const { longurl, invalidUrl } = this.state;
    const { error, textField } = this.props.classes;
    return (
      <Fragment>
        <Snackbar
          open={invalidUrl}
          color='danger'
          onClose={this.handleClose}
          className={error}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={1000}
          message={<span>This url address is invalid!</span>}
        />
        <form autoComplete='off' onSubmit={this.onSubmit}>
          <TextField
            value={longurl}
            id='long-url'
            label='Paste in your url'
            type='text'
            name='longurl'
            onChange={this.onChange}
            variant='outlined'
            autoFocus
            required
            margin='normal'
            fullWidth
            className={textField}
          />
          <Button
            fullWidth
            variant='contained'
            size='large'
            color='primary'
            type='submit'
            required
          >
            Send
          </Button>
        </form>
      </Fragment>
    );
  };

  render() {
    const { container, title } = this.props.classes;
    return (
      <Fragment>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' className={title}>
              Simple Url Shortener
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth='sm' className={container}>
          {this.state.isReturned ? (
            <Response shorturl={this.state.shorturl} reset={this.reset} />
          ) : (
            this.renderLanding()
          )}
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
