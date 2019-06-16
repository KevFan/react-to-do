import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useGlobal} from "../../store/Store";

export default function CustomDialog(props) {
  const [globalState, globalActions] = useGlobal();

  return (
      <div>
        <Dialog open={globalState.showCustomModal} onClose={(e) => globalActions.closeDialog()}
                aria-labelledby="form-dialog-title" fullWidth={true}
                maxWidth = {'md'}>
          <DialogTitle id="form-dialog-title">{globalState.customModalTitle}</DialogTitle>
          {globalState.customModalBody}
        </Dialog>
      </div>
  );
}
