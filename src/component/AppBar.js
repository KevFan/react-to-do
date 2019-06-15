import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import LogoutIcon from '@material-ui/icons/Forward';
import {useGlobal} from "../store/Store";
import {searchTodo} from "../data/RestInteraction";
import {useStyles} from "../css/MaterialCss";
import AddTodo from "./AddTodo";

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();

  const handleAddClick = () => {
    globalActions.setCustomModalTitle("Add todo");
    globalActions.setCustomModalBody(<AddTodo/>);
    globalActions.openDialog();
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    window.location = "/"
  };

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
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
            <IconButton
                aria-label="add a new todo"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={(e) => handleLogOutClick()}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
  );
}
