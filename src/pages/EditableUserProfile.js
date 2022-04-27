import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Group from "./Group";
import { calcButtonTextColor } from "../components/Profile/tools";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function EditableUserProfile({ stored, editCompleteCallback }) {
  console.log("Edit User Profile");

  const [name, setName] = useState(stored.name);
  const [bio, setBio] = useState(stored.bio);
  const [item1, setItem1] = useState(stored.item1);
  const [item2, setItem2] = useState(stored.item2);
  const [item3, setItem3] = useState(stored.item3);
  const [email, setEmail] = useState(stored.email);

  function handleCancelClicked() {
    editCompleteCallback(null);
  }

  function handleSaveClicked() {
    console.log("Saved");
    editCompleteCallback({
      name,
      bio,
      item1,
      item2,
      item3,
      email,
    });
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://previews.123rf.com/images/rokvel/rokvel1610/rokvel161001167/65260300-abstract-white-background-grau-farbe-vintage-grunge-texturen-und-hintergr%C3%BCnde-perfekt-mit-platz.jpg")`,
      }}
    >
      <Group>
        <h2>Name:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Group>

      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          fullWidth
          label="Email"
          id="fullWidth"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Group>
        <h2>List your top 3 skill set below:</h2>
      </Group>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>
            <TextField
              fullWidth
              id="fullWidth"
              type="text"
              value={item1}
              onChange={(e) => setItem1(e.target.value)}
            />
          </Item>
          <Item>
            <TextField
              fullWidth
              id="fullWidth"
              type="text"
              value={item2}
              onChange={(e) => setItem2(e.target.value)}
            />
          </Item>
          <Item>
            <TextField
              fullWidth
              id="fullWidth"
              type="text"
              value={item3}
              onChange={(e) => setItem3(e.target.value)}
            />
          </Item>
        </Stack>
      </Box>

      <Group> </Group>

      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField
          fullWidth
          label="Bio"
          id="fullWidth"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Box>

      <Group>
        <button onClick={handleSaveClicked}>Save</button>
        <button onClick={handleCancelClicked}>Cancel</button>
      </Group>
    </div>
  );
}
