import React, { useState } from "react";
import axios from "axios";
import styles from "./AuthForm.module.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface Props {
  isLoggedIn: boolean;
  handleOnChangeStatus: () => void;
}

export const AuthForm: React.FC<Props> = (props) => {
  const [display, setDisplay] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const registerUser = () => {};

  const loginUser = () => {
    axios
      .post(
        "http://localhost:3001/login",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in && response.data.user) {
          props.handleOnChangeStatus();
        } else {
          alert(`${response.data.errors}`);
        }
      })
      .catch((error) => {
        alert("通信に失敗しました。");
      });
  };

  return (
    <div className={styles.main}>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {display ? "Login" : "Regster"}
      </Typography>
      <form noValidate className={styles.form}>
        <div className={styles.textfield}>
          <TextField
            className={styles.textfield}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            autoFocus
          />
        </div>
        <div className={styles.textfield}>
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
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          {display ? (
            <></>
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirmation Password"
              type="password"
              id="password_confirmation"
              autoComplete="current-password"
              value={passwordConfirmation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
          )}
        </div>

        <div className={styles.textfield}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<EmailIcon />}
            onClick={
              display
                ? async () => {
                    try {
                      await loginUser();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
                : async () => {
                    try {
                      await registerUser();
                    } catch (err) {
                      console.log(err);
                      alert(err.message);
                    }
                  }
            }
          >
            {display ? "Login" : "Regster"}
          </Button>
          <Grid container>
            <Grid item xs>
              <span>Forgot password?</span>
            </Grid>
            <Grid item>
              <span onClick={() => setDisplay(!display)}>
                {display ? "Create new acount ?" : "Back to login"}
              </span>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
        </div>
      </form>
    </div>
  );
};
