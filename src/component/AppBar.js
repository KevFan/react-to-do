import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {useGlobal} from "../store/Store";
import {searchTodo} from "../data/RestInteraction";
import {useStyles} from "../css/MaterialCss";
import AddTodo from "./AddTodo";

export default function SearchAppBar() {
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();

  const handleAddClick = () => {
    globalActions.setCustomModalTitle("Add todo");
    globalActions.setCustomModalBody(<AddTodo/>);
    globalActions.openDialog();
  };

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.titleAppBar} variant="h6" noWrap>
              Material-UI Todo
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'Search' }}
                  onChange={(e) => searchTodo(e.target.value, globalActions)}
              />
            </div>
            <IconButton
                aria-label="add a new todo"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={(e) => handleAddClick()}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
  );
}
