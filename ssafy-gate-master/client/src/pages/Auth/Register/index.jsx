import React, { Component } from "react";
import { register } from "modules/UserFunctions";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      userid: "",
      password: "",
      region_id: "",
      //   errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      userid: this.state.userid,
      password: this.state.password,
      region_id: this.state.region_id,
    };

    register(user).then((res) => {
      this.props.history.push("/login");
    });
  };

  render() {
    const classes = styles;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="{classes.paper}">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  variant="outlined"
                  id="name"
                  placeholder="Enter name"
                  label="name"
                  autoFocus
                  required
                  fullWidth
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="userid"
                  variant="outlined"
                  id="userid"
                  placeholder="Enter userid"
                  label="userid"
                  autoFocus
                  required
                  fullWidth
                  value={this.state.userid}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  variant="outlined"
                  id="password"
                  placeholder="Enter password"
                  label="password"
                  autoFocus
                  required
                  fullWidth
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="region_id"
                  variant="outlined"
                  id="region_id"
                  placeholder="Enter region_id"
                  label="region_id"
                  autoFocus
                  required
                  fullWidth
                  aria-describedby="regionHelp"
                  value={this.state.region_id}
                  onChange={this.onChange}
                />
              </Grid>
            </Grid>
            <div className="form-group">
              <small id="regionHelp" className="form-text text-muted">
                1. 서울 2. 대전 3. 광주 4. 구미
              </small>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
