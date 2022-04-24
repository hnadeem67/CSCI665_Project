import { useState } from 'react';
import './profile.css';
import EditableUserProfile from './EditableUserProfile';
import UserProfile from './UserProfile';

const animals = [
    "Hamza",
    "Jahaan",
    "Henry",
]

function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function randomName() {
    return "Anonymous " + animals[Math.floor(Math.random() * animals.length)]
}

function randomBio() {
    return "[Enter Your Bio Here]"
}

function randomItem() {
    return "[Enter your skill here]"
}

function randomEmail() {
    return " "
}

function App() {
    const now = new Date(Date.now());
    const defaultBirthday = new Date(now.getTime() + 86400000);

    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState(randomName());
    const [month, setMonth] = useState(defaultBirthday.getMonth());
    const [day, setDay] = useState(defaultBirthday.getDate());
    const [color, setColor] = useState(randomColor());
    const [bio, setBio] = useState(randomBio());
    const [item1, setItem1] = useState(randomItem());
    const [item2, setItem2] = useState(randomItem());
    const [item3, setItem3] = useState(randomItem());
    const [email, setEmail] = useState(randomEmail());

    const stored = {name, month, day, color, bio, item1, item2, item3, email};
    const isBirthdayToday = now.getMonth() === month && now.getDate() === day;

    function handleEditComplete(result) {
        console.log("handleEditComplete", result);
        if (result != null) {
            setName(result.name);
            setMonth(result.month);
            setDay(result.day);
            setColor(result.color);
            setBio(result.bio);
            setItem1(result.item1);
            setItem2(result.item2);
            setItem3(result.item3);
            setEmail(result.email);
        }
        setEditMode(false);
    }

    return (
        <div className="container">
            <div className="App">
                {
                    editMode
                        ? <>
                            <h1>My Profile</h1>
                            <EditableUserProfile
                                    stored={stored}
                                    editCompleteCallback={handleEditComplete}
                            />
                        </>
                        : <>
                            {
                                isBirthdayToday
                                    ? <div className="birthday">Happy Birthday!</div>
                                    : <h1>Welcome User</h1>
                            }
                            <UserProfile
                                    stored={stored}
                                    startEditCallback={() => setEditMode(true)}
                            />
                        </>
                }
            </div>
        </div>
    );
}

export default App;
