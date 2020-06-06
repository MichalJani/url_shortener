import React, { useState } from 'react';
import { TextField, Button, Container, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    marginTop: theme.spacing(3),
  },
}));

const Response = ({ shorturl, reset }) => {
  const classes = useStyles();
  const [copySuccess, setCopySuccess] = useState('');
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function copyToClipboard(e) {
    const log = document.getElementById('short-url');
    log.select();
    document.execCommand('copy');
    e.target.focus();
    handleClick();
    setCopySuccess('Copied!');
  }

  return (
    <Container maxWidth='sm' className={classes.paper}>
      <TextField
        className={classes.margin}
        id='short-url'
        type='text'
        name='shorturl'
        variant='outlined'
        autoFocus
        fullWidth
        value={shorturl}
      />
      <Button
        className={classes.margin}
        onClick={copyToClipboard}
        variant='contained'
        fullWidth
      >
        Copy link
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message={<span>{copySuccess}</span>}
      />
      <Button
        className={classes.margin}
        onClick={reset}
        variant='outlined'
        color='secondary'
        size='small'
      >
        Another url? Click here!
      </Button>
    </Container>
  );
};

export default Response;
