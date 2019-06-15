import React, {useEffect} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import SearchAppBar from "./AppBar";
import {useGlobal} from "../store/Store";
import {deleteTodo, findAllTodo} from "../data/RestInteraction";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TodoListing() {
  const [globalState, globalActions] = useGlobal();
  const classes = useStyles();

  useEffect(() => {
    findAllTodo(globalActions)
  }, []);

  const handleDeleteClick = (id) => {
    deleteTodo(id, globalActions)
  };

  const todoCards = globalState.todos.map(it => {
    return (
        <Card key={it.id} className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {it.createdDate}
            </Typography>
            <Typography variant="h5" component="h2">
              {it.content}
            </Typography>
            <Typography variant="body2" component="p">
              {it.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton >
              <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => handleDeleteClick(it.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
    )
  });

  return (
      <div>
        <SearchAppBar/>
        <Container component="main" maxWidth="sm">
          {todoCards}
        </Container>
      </div>
  );
}