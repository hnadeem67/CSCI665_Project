import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  logout,
  getEvent,
  editEvent,
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
import SaveIcon from "@mui/icons-material/Save";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ImageUploading from "react-images-uploading";

// event category list
const CATE_LIST = [
  "Technology",
  "Business",
  "Politics",
  "Entertainment",
  "Cooking",
  "Sports",
];

export default function EventEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [eventName, setEventName] = useState("");
  const [cate, setCate] = React.useState("");
  const [date_, setDate_] = React.useState(new Date());
  const [eventDesription, setEventDesription] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const eventId = window.location.pathname.split("/")[2] || null;

  const eventNameHandler = (title) => {
    setEventName(title.target.value);
  };

  const categoryHandler = (event) => {
    setCate(event.target.value);
  };

  const dateHandler = (newValue) => {
    setDate_(newValue);
  };

  const eventDescriptionHandler = (description) => {
    setEventDesription(description.target.value);
  };

  const eventLocationHandler = (location) => {
    setEventLocation(location.target.value);
  };

  const [images, setImages] = React.useState([]);
  const onChange = (imageList) => {
    setImages(imageList);
  };

  useEffect(() => {
    function checkEditType() {
      if (location.state.type === 0) {
        // this is editing an existing event
        setEventName(location.state.event.title);
        setCate(location.state.event.category);
        setDate_(location.state.event.dateOfEvent);
        setEventDesription(location.state.event.description);
        setEventLocation(location.state.event.location);
        setImages([{ data_url: location.state.event.image }]);
        fetchEventFromFirebase();
      } else {
        // this is creating a new event
        setEventName("");
        setCate("");
        setDate_(new Date());
        setEventDesription("");
        setEventLocation("");
        setImages([]);
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
    checkEditType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {location.state.type === 0 ? "Event Edit" : "Event Creation"}
              </Typography>
              <div>
                <FormControl fullWidth>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={1}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      isDragging,
                      dragProps,
                    }) => (
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            pb: 2,
                          }}
                        >
                          {imageList.length === 0 ? (
                            <Button
                              style={isDragging ? { color: "red" } : null}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Upload Image
                            </Button>
                          ) : (
                            <Button onClick={onImageRemoveAll}>
                              Remove Image
                            </Button>
                          )}
                        </Box>
                        {imageList.map((image, index) => (
                          <Box key={index} sx={{ pb: 3 }}>
                            <Img
                              alt="complex"
                              src={image.data_url}
                              style={{
                                width: "100%",
                                height: "auto",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </ImageUploading>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Event Title
                  </InputLabel>
                  <OutlinedInput
                    value={eventName}
                    onChange={eventNameHandler}
                    label="Event Title"
                    fullWidth
                  />
                </FormControl>

                <br />
                <br />

                <Box component="form" noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <DateTimePicker
                          label="Event Date & Time"
                          value={date_}
                          onChange={dateHandler}
                          renderInput={(params) => <TextField {...params} />}
                          fullWidth
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <br />

                <Typography gutterBottom variant="h9" component="div">
                  Event Description:
                </Typography>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="Event Description"
                  value={eventDesription}
                  onChange={eventDescriptionHandler}
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    minWidth: "100%",
                    minHeight: 100,
                  }}
                />

                <br />
                <br />

                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Event Location
                  </InputLabel>
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
              onClick={async () => {
                if (location.state.type === 0) {
                  await editEvent({
                    title: eventName,
                    description: eventDesription,
                    category: cate,
                    location: eventLocation,
                    image:
                      images?.[0]?.data_url ||
                      `${faker.image.city()}?random=${Math.round(
                        Math.random() * 1000
                      )}`,
                    dateOfEvent: `${date_}`,
                    eventId,
                  });
                  return navigate("/event/" + eventId + "?success=true");
                } else {
                  // create event handler
                  const event = await createEvent({
                    title: eventName,
                    description: eventDesription,
                    category: cate,
                    location: eventLocation,
                    image:
                      images?.[0]?.data_url ||
                      `${faker.image.city()}?random=${Math.round(
                        Math.random() * 1000
                      )}`,
                    dateOfEvent: `${date_}`,
                    organizer: user.uid,
                  });
                  return navigate("/event/" + event.eventId + "?success=true");
                }
              }}
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
