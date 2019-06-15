import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {useGlobal} from "../store/Store";
import {addTodo} from "../data/RestInteraction";

export default function AddTodo() {
  const [globalState, globalActions] = useGlobal();
  const [content, setContent] = useState("");

  const handleAddTodo = () => {
    addTodo(content, globalActions);
    globalActions.closeDialog();
  };

  return (
      <div>
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
            <Button onClick={(e) => globalActions.closeDialog()} color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => handleAddTodo()} color="primary">
              Add
            </Button>
          </DialogActions>
      </div>
  );
}
