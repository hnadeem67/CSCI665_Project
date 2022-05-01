import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Group from "./Group";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function EditableUserProfile({ stored, startEditCallback }) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <Avatar
          alt="Profile Image"
          src={stored.profilePicture}
          sx={{ width: 100, height: 100 }}
        />
      </Box>

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
    </Box>
  );
}
