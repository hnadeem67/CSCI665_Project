import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  logout,
  getEvents,
  createEvent,
  query,
} from "../utils/authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { faker } from "@faker-js/faker";
import List from "../components/search_function/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import MenuList from "@mui/material/MenuList";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  TextField,
  Box,
  CssBaseline,
  Link,
  GlobalStyles,
  Fab,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { async } from "@firebase/util";

const CATE_LIST = [
  "Technology",
  "Business",
  "Politics",
  "Entertainment",
  "Cooking",
  "Sports",
];

export default function Homepage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [cate, setCate] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const submitHandler = async () => {
    const allEvents = await getEvents();
    if (inputText.length === 0) return setEvents(allEvents);
    const newEvents = allEvents.filter((x) =>
      x.title.toLowerCase().includes(inputText.toLowerCase())
    );
    setEvents(newEvents);
  };

  const sortByAttendeesLowestFirst = async () => {
    console.log('test')
    const allEvents = await getEvents();
    console.log(allEvents)
    if (allEvents.length === 0) return setEvents(allEvents);
    const newEvents = allEvents.sort(
      (x, y) => y.attendees.length - x.attendees.length
    ); // for high to low, switch x and y
    console.log(newEvents)
    setEvents(newEvents);
    
  };

  const sortByDateOfEventOldestFirst = async () => {
    const allEvents = await getEvents();
    if (allEvents.length === 0) return setEvents(allEvents);
    const newEvents = allEvents.sort(
      (x, y) => new Date(x.dateOfEvent) - new Date(y.dateOfEvent)
    ); // for recent to oldest, switch x and y
    console.log(newEvents)
    setEvents(newEvents);
    };

  const clear = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents);
  }

  const categoryHandler = (event) => {
    setCate(event.target.value);
  };

  async function fetchEventsFromFirebase() {
    const events = await getEvents();
    setEvents(events);
  }

  useEffect(() => {
    fetchEventsFromFirebase();
    // if (user) navigate("/events");
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Ideal Events
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="button"
              color="text.primary"
              onClick={() => navigate("/profile")}
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Button>
            {user ? (
              <div>
                <Button
                  href="#"
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                href="#"
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
                onClick={signInWithGoogle}
              >
                Login/Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* End hero unit */}
      <Container maxWidth="xl" component="main" sx={{ pb: 10 }}>
        <Box style={{ marginTop: 50 }} sx={{ flexGrow: 1 }}>
          {/* Hamza's fitering/sorting component here */}
          <Grid
            container
            spacing={2}
            sx={{ mb: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={7} md={10}>
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitHandler();
                  }
                }}
                label="Search for an Ideal Event"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5} md={2}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Sort
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={sortByAttendeesLowestFirst}>
                    <ListItemText inset>By Attendees</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={sortByDateOfEventOldestFirst}>
                    <ListItemText inset>By Date of Events</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={clear}>
                    <ListItemText inset>Clear</ListItemText>
                  </MenuItem>
                </Menu>

                <Button
                  id="basic-button"
                  aria-controls={open2 ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? "true" : undefined}
                  onClick={handleClick2}
                >
                  Filter
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl1={anchorEl2}
                  open={open2}
                  onClose={handleClose2}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem >
                  <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={cate}
                          label="Category"
                          onChange={categoryHandler}
                        >
                          {CATE_LIST.map((_cate) => (
                            <MenuItem value={_cate} key={_cate}>
                              {_cate}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                  </MenuItem>
                  <MenuItem onClick={clear}>
                    <ListItemText inset>Clear</ListItemText>
                  </MenuItem>
                </Menu>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {events.map((event) => (
              <CardContent event={event} key={event.eventId} />
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Add event button */}
      {user && (
        <Fab
          style={{
            margin: 0,
            top: "auto",
            left: "auto",
            bottom: 20,
            right: 20,
            position: "fixed",
          }}
          color="primary"
          aria-label="add"
          // for now create dummy event for testing
          onClick={() =>
            navigate(`/event/create`, {
              state: { type: 1 },
            })
          }
        >
          <AddIcon />
        </Fab>
      )}
    </React.Fragment>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function CardContent(props) {
  const {
    eventId,
    title,
    description,
    category,
    attendees,
    location,
    image,
    dateOfEvent,
  } = props.event;
  const navigate = useNavigate();

  return (
    <Grid item xs={6} md={4}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          cursor: "pointer",
        }}
        elevation={2}
        onClick={() => navigate(`/event/${eventId}`)}
      >
        <Grid container spacing={2}>
          <Grid
            item
            style={{
              width: "100%",
              height: "auto",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Img
              alt="complex"
              src={image}
              style={{
                width: "100%",
                height: "auto",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  style={{ fontWeight: 700 }}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Attendees: {attendees.length}
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ marginTop: -5 }} variant="body2">
                  {location}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {new Date(dateOfEvent).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
