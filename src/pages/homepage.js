import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  logout,
  getEvents,
  createEvent,
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

export default function Homepage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEventsFromFirebase() {
      const events = await getEvents();
      console.log(events);
      setEvents(events);
    }
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
                label="Search for Events"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={5} md={2}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button>Filter</Button>
                <Button>Sort</Button>
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
    <Grid item xs={4}>
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
