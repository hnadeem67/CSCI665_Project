import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';

export default function Event() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);

  const eventId = window.location.pathname.split("/")[2] || null;

  useEffect(() => {
    async function fetchEventFromFirebase() {
      if (!eventId) {
        return navigate("/?error=MISSING_EVENT_ID");
      }
      console.log(eventId);
      const event = await getEvent(eventId);
      const organizer = await getOrganizerInfo(eventId);
      if (!event) {
        return navigate("/?error=EVENT_NOT_FOUND");
      }
      console.log(event);
      setEvent(event);
      setOrganizer(organizer);
    }
    fetchEventFromFirebase();
  }, [eventId, navigate]);

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
        {event && <CardContent event={event} />}
        {organizer && (<OrganizerInfo organizer={organizer} />)}
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
                title: faker.company.companyName(),
                description: faker.lorem.paragraph(),
                category: "Technology",
                location: faker.address.streetAddress(true),
                image: `${faker.image.city()}?random=${Math.round(
                  Math.random() * 1000
                )}`,
                dateOfEvent: `${new Date(
                  new Date().getTime() +
                  faker.datatype.number({ min: 10, max: 100 }) * 86400000
                )}`,
                organizer: user.uid,
              })
            }
          >
            <AddIcon />
          </Fab>

          {/* Edit event button */}
          <Fab
            style={{
              margin: 0,
              top: "auto",
              left: "auto",
              bottom: 90,
              right: 20,
              position: "fixed",
            }}
            color="secondary"
            aria-label="edit"
            // for now create dummy event for testing
            onClick={() =>
              navigate(`/event/${eventId}/edit`, {state: {event: event, type: 0 }})
            }
          >
            <EditIcon />
          </Fab>
        </div>
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
    title,
    description,
    category,
    attendees,
    location,
    image,
    dateOfEvent,
  } = props.event;

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
        elevation={2}
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
            <Typography gutterBottom variant="h4" component="div">
              Event Details
            </Typography>
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

function OrganizerInfo(props) {
  const {
    bio,
    email,
    name,
    profilePicture,
  } = props.organizer;

  return (
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
          Event Organizer
        </Typography>
        <hr />
        <b>Name:</b> {name}
        <br/>
        <b>Email:</b> {email}
        <br/>
        {(bio).length < 1 ? (<div><b>Bio:</b> N/A</div>) : (<div><b>Bio:</b> {bio}</div>)}
      </Paper>
    </Grid>
  );

}