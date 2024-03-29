import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from "../../css/MaterialCss";
import {signUp} from "../../data/RestInteraction";
import {useGlobal} from "../../store/Store";
import {Link} from "react-router-dom";
import {LOGIN} from "../../constants/RouterRoutes";

export default function SignUp(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [globalState, globalActions] = useGlobal();

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => signUp(username, password, confirmPassword, props, globalActions)}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item>
                <Link to={LOGIN} variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
  );
}