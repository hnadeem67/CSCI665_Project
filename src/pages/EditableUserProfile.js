import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Group from './Group';
import { months, calcButtonTextColor } from '../components/Profile/tools';

function renderMonthOptions() {
    return months.getMonths().map( (m, i) => {
        return <option
            key={i}
            value={i}
        >
            {m.shortName}
        </option>
    });
}

function bound(value, floor, ceil) {
    return Math.min(ceil, Math.max(value, floor));
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function EditableUserProfile({
    stored,
    editCompleteCallback
})
{

    console.log("Edit User Profile");

    const [name, setName] = useState(stored.name);
    const [month, setMonth] = useState(stored.month);
    const [day, setDay] = useState(stored.day);
    const [color, setColor] = useState(stored.color);
    const [bio, setBio] = useState(stored.bio);
    const [item1, setItem1] = useState(stored.item1);
    const [item2, setItem2] = useState(stored.item2);
    const [item3, setItem3] = useState(stored.item3);
    const [email, setEmail] = useState(stored.email);
    const maxDay = months.getMaxDays(month);

    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        console.log("Saved");
        editCompleteCallback({name, month, day, color, bio, item1, item2, item3, email});
    }

    useEffect(() => {
        setDay(bound(day, 1, maxDay));
    }, [month]);

    const buttonStyle = {
        backgroundColor: color,
        color: calcButtonTextColor(color)
    };

    calcButtonTextColor(color);

    return <div style={{backgroundImage: `url("https://previews.123rf.com/images/rokvel/rokvel1610/rokvel161001167/65260300-abstract-white-background-grau-farbe-vintage-grunge-texturen-und-hintergr%C3%BCnde-perfekt-mit-platz.jpg")`}}>
        <Group>            
            <h2>Name:</h2>
            <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
            />            
        </Group>
        <Group>            
            <h2>Birthday:</h2>            
            
            <select
                value={month}
                onChange={e => setMonth(bound(e.target.value, 0, 11))}
            >
                {renderMonthOptions()}
            </select>
            <input
                type='number'
                value={day}
                onChange={e => setDay(bound(e.target.value, 1, maxDay))}
                style={{width: "50px"}}
            />
        </Group>

        <Box sx={{width: 500, maxWidth: '100%',}}>
            <TextField fullWidth label="Email" id="fullWidth" type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </Box>

        <Group>
        <h2>List your top 3 skill set below:</h2>
        </Group>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Item><TextField fullWidth id="fullWidth" type="text" value={item1} onChange={e => setItem1(e.target.value)} /></Item>
            <Item><TextField fullWidth id="fullWidth" type="text" value={item2} onChange={e => setItem2(e.target.value)} /></Item>
            <Item><TextField fullWidth id="fullWidth" type="text" value={item3} onChange={e => setItem3(e.target.value)} /></Item>
          </Stack>
        </Box>

        <Group> </Group>

        <Box sx={{width: 500, maxWidth: '100%',}}>
        <TextField fullWidth label="Bio" id="fullWidth" type="text" value={bio} onChange={e => setBio(e.target.value)} />

        </Box>



        <Group>
            <button style={buttonStyle} onClick={handleSaveClicked}>Save</button>
            <button style={buttonStyle} onClick={handleCancelClicked}>Cancel</button>
        </Group>
    </div>
}