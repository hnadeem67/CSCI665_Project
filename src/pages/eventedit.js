import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  logout,
  getEvent,
  createEvent,
  getOrganizerInfo,
} from "../utils/authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { faker } from "@faker-js/faker";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  CssBaseline,
  Link,
  GlobalStyles,
  Fab,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


// event category list
const CATE_LIST = [
  "None",
  "Ten",
  "Twenty",
  "Thirty",
  "Technology",
];

export default function EventEdit() {

  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [eventName, setEventName] = useState("");
  const [cate, setCate] = React.useState('');
  const [date_, setDate_] = React.useState(new Date());
  const [eventDesription, setEventDesription] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const eventId = window.location.pathname.split("/")[2] || null;


  const eventNameHandler = (title) => {
    setEventName(title);
  }

  const categoryHandler = (event: SelectChangeEvent) => {
    setCate(event.target.value);
  };

  const dateHandler = (newValue: Date) => {
    setDate_(newValue);
  };

  const eventDescriptionHandler = (description) => {
    setEventDesription(description);
  }

  const eventLocationHandler = (location) => {
    setEventLocation(location);
  }


  useEffect(() => {


    function checkEditType() {
      if (location.state.type === 0) {
        // this is editing an existing event
        setEventName(location.state.event.title);
        setCate(location.state.event.category);
        setDate_(location.state.event.dateOfEvent);
        setEventDesription(location.state.event.description);
        setEventLocation(location.state.event.location);
      }
    }

    async function fetchEventFromFirebase() {
      if (!eventId) {
        return navigate("/?error=MISSING_EVENT_ID");
      }
      // console.log(eventId);
      const event = await getEvent(eventId);
      const organizer = await getOrganizerInfo(eventId);
      if (!event) {
        return navigate("/?error=EVENT_NOT_FOUND");
      }
      // console.log(event);
      setEvent(event);
      setOrganizer(organizer);
      // console.log("State: " + JSON.stringify(location.state));
    }
    fetchEventFromFirebase();
    checkEditType();
  }, [eventId, navigate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Profile
              </Link>
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
        <Container maxWidth="xl" component="main" sx={{ mt: 5, mb: 3 }}>

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 800,
                flexGrow: 1,
                marginTop: 5,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
              elevation={2}
            >
              <Typography gutterBottom variant="h4" component="div">
                {location.state.type === 0 ? ("Event Edit") : ("Event Creation")}
              </Typography>
              <div>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Event Title</InputLabel>
                  <OutlinedInput
                    id="fullWidth"
                    value={eventName}
                    onChange={eventNameHandler}
                    label="Event Title"
                  />
                </FormControl>

                <br />
                <br />

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { marginRight: 1, marginBottom: 4, width: 376 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={cate}
                      label="Category"
                      onChange={categoryHandler}
                    >
                      {CATE_LIST.map((_cate) => (<MenuItem value={_cate} key={_cate}>{_cate}</MenuItem>))}
                    </Select>
                  </FormControl>

                  <DateTimePicker
                    label="Event Date & Time"
                    value={date_}
                    onChange={dateHandler}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>

                <Typography gutterBottom variant="h9" component="div">
                  Event Description:
                </Typography>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="Event Description"
                  value={eventDesription}
                  onChange={eventDescriptionHandler}
                  style={{ maxWidth: "100%", width: "100%", minWidth: "100%", minHeight: 100 }}
                />

                <br />
                <br />

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Event Location</InputLabel>
                  <OutlinedInput
                    id="fullWidth"
                    value={eventLocation}
                    onChange={eventLocationHandler}
                    label="Event Location"
                  />
                </FormControl>
                <br />

              </div>
            </Paper>
          </Grid>

        </Container>

        {/* Add event button */}
        {user && (
          <div>
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
                createEvent({
                  title: eventName,
                  description: eventDesription,
                  category: cate,
                  location: eventLocation,
                  image: `${faker.image.city()}?random=${Math.round(
                    Math.random() * 1000
                  )}`,
                  dateOfEvent: date_,
                  organizer: user.uid,
                })
              }
            >
              <SaveIcon />
            </Fab>
          </div>
        )}
      </React.Fragment>
    </LocalizationProvider>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
