import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useGlobal} from "../store/Store";
import {addTodo} from "../data/RestInteraction";

export default function AddTodoDialog() {
  const [globalState, globalActions] = useGlobal();
  const [content, setContent] = useState("");

  const handleAddTodo = () => {
    addTodo(content, globalActions);
    globalActions.setTodoDialog(false);
  };

  return (
      <div>
        <Dialog open={globalState.showAddTodoDialog} onClose={(e) => globalActions.setTodoDialog(false)}
                aria-labelledby="form-dialog-title" fullWidth={true}
                maxWidth = {'md'}>
          <DialogTitle id="form-dialog-title">New todo</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="content"
                label="Content"
                type="text"
                fullWidth
                multiline={true}
                onChange={(e) => setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => globalActions.setTodoDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => handleAddTodo()} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
