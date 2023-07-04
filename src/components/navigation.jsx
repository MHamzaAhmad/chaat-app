import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { AdminPanelSettings, Group } from "@mui/icons-material";
import { accentColor, lighterAccentColor, mainColor } from "../utils/colors";
import Groups from "../features/groups/Groups";
import Inbox from "../features/inbox/inbox";
import { capitalize } from "lodash";

const drawerWidth = 240;

const rootNavigationStack = {
  inbox: {
    type: "component",
    icon: <InboxIcon />,
    component: <Inbox />,
  },
  groups: {
    type: "component",
    icon: <Group />,
    component: <Groups />,
  },
  d1: {
    type: "divider",
    icon: null,
    component: null,
  },
  admin: {
    type: "component",
    icon: <AdminPanelSettings />,
    component: <Inbox />,
  },
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: accentColor,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      backgroundColor: mainColor,
      ...openedMixin(theme),
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      backgroundColor: mainColor,
      ...closedMixin(theme),
    },
  }),
}));

const DrawerItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: lighterAccentColor,
    opacity: "0.5",
    "& .MuiListItemIcon-root": {
      color: mainColor,
    },
  },
  "& .MuiListItemIcon-root": {
    color: accentColor,
  },
}));

const Item = ({ val, onClick, open }) => {
  return (
    <>
      <DrawerItem key={val} disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {rootNavigationStack[val].icon}
          </ListItemIcon>
          <ListItemText
            primary={capitalize(val)}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </DrawerItem>
    </>
  );
};

export default function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tabKey, setTabKey] = React.useState("inbox");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Chaat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Object.keys(rootNavigationStack).map((val) => {
            return rootNavigationStack[val].type === "divider" ? (
              <Divider key={val} />
            ) : (
              <Item
                key={val}
                val={val}
                onClick={(e) => {
                  e.preventDefault();
                  setTabKey(val);
                }}
                open={open}
              />
            );
          })}
        </List>
      </Drawer>
      <DrawerHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "4rem",
        }}
      >
        {rootNavigationStack[tabKey].component}
      </Box>
    </Box>
  );
}
