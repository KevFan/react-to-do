import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useGlobal} from "../store/Store";
import {addTodo} from "../data/RestInteraction";

export default function CustomDialog(props) {
  const [globalState, globalActions] = useGlobal();

  return (
      <div>
        <Dialog open={globalState.showCustomModal} onClose={(e) => globalActions.setCustomModal(false)}
                aria-labelledby="form-dialog-title" fullWidth={true}
                maxWidth = {'md'}>
          <DialogTitle id="form-dialog-title">{globalState.customModalTitle}</DialogTitle>
          {globalState.customModalBody}
        </Dialog>
      </div>
  );
}
