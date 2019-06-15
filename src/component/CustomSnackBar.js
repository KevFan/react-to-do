import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useGlobal} from "../store/Store";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function CustomSnackbar() {
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();

  return (
      <div>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={globalState.showSnackBar}
            autoHideDuration={3000}
            onClose={ (e) => globalActions.closeSnackBar()}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{globalState.snarkBarMessage}</span>}
            action={[
              <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={(e) =>globalActions.closeSnackBar()}
              >
                <CloseIcon />
              </IconButton>,
            ]}
        />
      </div>
  );
}