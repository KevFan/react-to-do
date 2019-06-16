import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {useGlobal} from "../../store/Store";
import {updateTodo} from "../../data/RestInteraction";

export default function EditTodoDialog(props) {
  const [content, setContent] = useState(props.todo.content);
  const [globalState, globalActions] = useGlobal();

  const handleUpdateClick = () => {
    updateTodo(props.todo.id, content, globalActions);
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
                value={content}
                multiline={true}
                onChange={(e) => setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => globalActions.closeDialog()} color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => handleUpdateClick()} color="primary">
              Update
            </Button>
          </DialogActions>
      </div>
  );
}
