import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Group from "./Group";
import ColorBox from "./ColorBox";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { calcButtonTextColor } from "../components/Profile/tools";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Input = styled("input")({
  display: "none",
});

export default function EditableUserProfile({ stored, startEditCallback }) {
  return (
    <div>
      <Avatar alt="Profile Image" src={stored.profilePicture} sx={{ width: 100, height: 100 }} />

      <Stack>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera /> 
          </IconButton>
        </label>
      </Stack>

      <Group>
        <h2>Name:</h2> {stored.name}
      </Group>
      <Group>
        <h2>Email:</h2> {stored.email}
      </Group>
      <Group>
        <h2>List your top 3 skill set below:</h2>
      </Group>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>{stored.item1}</Item>
          <Item>{stored.item2}</Item>
          <Item>{stored.item3}</Item>
        </Stack>
      </Box>

      <Group> </Group>
      <Group>
        <h2>Bio:</h2> {stored.bio}
      </Group>
      <Group>
        <button onClick={startEditCallback}>Edit</button>
      </Group>
    </div>
  );
}
