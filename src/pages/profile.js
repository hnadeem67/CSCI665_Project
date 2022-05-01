import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { signInWithGoogle, logout } from "../utils/authentication/firebase";
import "./profile.css";
import EditableUserProfile from "./EditableUserProfile";
import UserProfile from "./UserProfile";
import { AuthContext } from "../utils/authentication/AuthContext";
import { editUser } from "../utils/authentication/firebase";

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function randomItem() {
  return "[Enter your skill here]";
}

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState(user?.name);
  const [color, setColor] = useState(randomColor());
  const [bio, setBio] = useState(user?.bio);
  const [item1, setItem1] = useState(randomItem());
  const [item2, setItem2] = useState(randomItem());
  const [item3, setItem3] = useState(randomItem());
  const [email, setEmail] = useState(user?.email);
  const [profilePicture, setPicture] = useState(user?.profilePicture);

  /**   authProvider: "google"
        bio: ""
        email: "jjain04@nyit.edu"
        eventsAttended: []
        eventsCreated: []
        favoriteConferenceType: ""
        name: "Jahaan Jain"
        profilePicture: "https://lh3.googleusercontent.com/a-/AOh14Ggmm7enR-l9RazxG89XVE2q9HsanjBNqlDIJCACYQ=s96-c"
        uid: "jZ5jSO1szuXJIztaoMQEhlW8BzY2"
   */

  const stored = {
    name,
    color,
    bio,
    item1,
    item2,
    item3,
    email,
    profilePicture,
  };

  function handleEditComplete(result) {
    console.log("handleEditComplete", result);
    if (result != null) {
      setName(result.name);
      setColor(result.color);
      setBio(result.bio);
      setItem1(result.item1);
      setItem2(result.item2);
      setItem3(result.item3);
      setEmail(result.email);
      setPicture(result.profilePicture);
      const userUpdateData = {
        name: result.name,
        bio: result.bio,
      };
      editUser(userUpdateData);
    }
    setEditMode(false);
  }

  return (
    <div className="container">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "#f5f5f5",
        }}
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
      {user ? (
        <div className="App">
          {editMode ? (
            <>
              <h1>My Profile</h1>
              <EditableUserProfile
                stored={stored}
                editCompleteCallback={handleEditComplete}
              />
            </>
          ) : (
            <>
              <h1>Welcome {stored.name} </h1>
              <UserProfile
                stored={stored}
                startEditCallback={() => setEditMode(true)}
              />
            </>
          )}
        </div>
      ) : (
        <p>Not logged in.</p>
      )}
    </div>
  );
}

export default App;
