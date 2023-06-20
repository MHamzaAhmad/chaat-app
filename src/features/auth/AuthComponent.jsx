import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/signupForm";
import {
  Container,
  Grid,
  Divider,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import { secondaryColor } from "../../utils/colors";
import { Google } from "@mui/icons-material";

const AuthComponent = (children) => {
  const [login, setLogin] = useState(true);

  const toggleLogin = (e) => {
    e.preventDefault();
    setLogin(!login);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        background: secondaryColor,
        padding: "3rem",
        borderRadius: "0.5rem",
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>{login === true ? <LoginForm /> : <SignupForm />}</Grid>
        <Grid item>
          <Divider>
            <Chip label="OR" />
          </Divider>
        </Grid>
        <Grid item>
          <Button variant="contained" fullWidth startIcon={<Google />}>
            Sign in with Google
          </Button>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <Typography>
                {" "}
                {login
                  ? "If you don't have an account"
                  : "If you already have an account"}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={toggleLogin} variant="text">
                {!login ? "Log in" : "Sign up"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthComponent;
