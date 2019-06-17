import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import SearchAppBar from "../layout/AppBar";
import {useGlobal} from "../../store/Store";
import {deleteTodo, findAllTodo} from "../../data/RestInteraction";
import {useStyles} from "../../css/MaterialCss";
import CustomDialog from "../layout/CustomDialog";
import EditTodo from "./EditTodo";
import moment from "moment";

export default function TodoHome() {
  const [globalState, globalActions] = useGlobal();
  const [todos, setTodos] = useState([]);
  const classes = useStyles();

  const addNewTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodoInState = (id) => {
    setTodos(todos.filter(it => it.id !== id));
  };

  const updateTodoInState = (updatedTodo) => {
    const index = todos.findIndex( it => it.id === updatedTodo.id);
    todos[index] = updatedTodo;
    setTodos(todos);
  };

  useEffect(() => {
    findAllTodo(setTodos, globalActions);
  }, []);

  const handleEditClick = (todo) => {
    globalActions.setCustomModalTitle("Update Todo");
    globalActions.setCustomModalBody(<EditTodo todo={todo} updateTodoInState={updateTodoInState}/>);
    globalActions.openDialog();
  };

  const todoCards = todos.map(it => {
    return (
        <Card key={it.id} className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {moment(new Date(it.createdDate)).format("MMMM Do YYYY, h:mm:ss")}
            </Typography>
            <Typography variant="body2" component="p">
              {it.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={(e) => handleEditClick(it)}>
              <EditIcon color="primary"/>
            </IconButton>
            <IconButton onClick={(e) => deleteTodo(it.id, deleteTodoInState, globalActions)}>
              <DeleteIcon color="error"/>
            </IconButton>
          </CardActions>
        </Card>
    )
  });

  return (
      <div>
        <CustomDialog/>
        <SearchAppBar addNewTodo={addNewTodo} setTodos={setTodos}/>
        <Container component="main" maxWidth="sm">
          {todoCards}
        </Container>
      </div>
  );
}