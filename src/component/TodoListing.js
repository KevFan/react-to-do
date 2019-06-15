import React, {useEffect} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import SearchAppBar from "./AppBar";
import {useGlobal} from "../store/Store";
import {deleteTodo, findAllTodo} from "../data/RestInteraction";
import {useStyles} from "../css/MaterialCss";
import CustomDialog from "./CustomDialog";
import EditTodo from "./EditTodo";
import moment from "moment";

export default function TodoListing() {
  const [globalState, globalActions] = useGlobal();
  const classes = useStyles();

  useEffect(() => {
    findAllTodo(globalActions)
  }, []);

  const handleEditClick = (todo) => {
    globalActions.setCustomModalTitle("Update Todo");
    globalActions.setCustomModalBody(<EditTodo todo={todo}/>);
    globalActions.openDialog();
  };

  const todoCards = globalState.todos.map(it => {
    return (
        <Card key={it.id} className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {moment(new Date(it.createdDate)).format("MMMM Do YYYY, h:mm:ss")}
            </Typography>
            <Typography variant="h5" component="h2">
              {it.content}
            </Typography>
            <Typography variant="body2" component="p">
              {it.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={(e) => handleEditClick(it)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => deleteTodo(it.id, globalActions)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
    )
  });

  return (
      <div>
        <CustomDialog/>
        <SearchAppBar/>
        <Container component="main" maxWidth="sm">
          {todoCards}
        </Container>
      </div>
  );
}