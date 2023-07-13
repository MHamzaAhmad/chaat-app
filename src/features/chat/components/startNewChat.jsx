import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { accentColor, lightGrey } from "../../../utils/colors";
import { Chat } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Messenger from "./messenger";
import { useUserService } from "../../../services/userService";
import _ from "lodash";

const StartNewChat = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);

  const { userService } = useUserService();

  useEffect(() => {
    const getUsers = async () => {
      const res = await userService.getUsers();
      setUsers(res);
    };
    getUsers();
  }, []);

  const handleOpenDialog = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const closeDialog = (e) => {
    e.preventDefault();
    setOpenDialog(false);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: lightGrey,
          padding: "1.1rem 1.5rem",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <IconButton onClick={handleOpenDialog}>
              <Chat
                sx={{
                  color: accentColor,
                }}
              />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography>Start new Chat</Typography>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} fullScreen>
        <DialogTitle>Start new chat</DialogTitle>
        <DialogContent dividers>
          {_.isEmpty(users)
            ? "No user found"
            : users.map((user) => (
                <Messenger
                  key={user._id}
                  user={user}
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                />
              ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartNewChat;
