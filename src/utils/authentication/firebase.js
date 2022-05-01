import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import uuid from "react-native-uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC2NYqoZFQYz9Add78UAlLb6nsv5nlVq3I",
  authDomain: "ideal-events-4ecd1.firebaseapp.com",
  projectId: "ideal-events-4ecd1",
  storageBucket: "ideal-events-4ecd1.appspot.com",
  messagingSenderId: "111986312707",
  appId: "1:111986312707:web:9c4b39fd9dea47540e7036",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      console.info("Creating new user for ", user.displayName);
      const userObj = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        profilePicture: user.photoURL,
        bio: "",
        favoriteConferenceType: "",
        eventsCreated: [],
        eventsAttended: [],
      };
      await addDoc(collection(db, "users"), userObj);
      return userObj;
    }
    return {
      ...docs.docs[0].data(),
      docId: docs.docs[0].id,
    };
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const getUser = async () => {
  try {
    const { uid } = auth.currentUser;
    const userRef = query(collection(db, "users"), where("uid", "==", uid));
    const docs = await getDocs(userRef);
    if (docs.docs.length === 0) {
      throw new Error("user doesnt exist");
    }
    return {
      ...docs.docs[0].data(),
      docId: docs.docs[0].id,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};

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
const exampleUserObject = {
  bio: "",
  eventsAttended: [],
  eventsCreated: [],
  favoriteConferenceType: "",
  name: "Jahaan Jain",
};

export const editUser = async (data) => {
  try {
    const { uid } = auth.currentUser;
    const userRef = query(collection(db, "users"), where("uid", "==", uid));
    const docs = await getDocs(userRef);
    if (docs.docs.length === 0) {
      throw new Error("user doesnt exist");
    }
    const documentId = docs.docs[0].id;

    const usersRefEdit = doc(db, "users", documentId);
    await updateDoc(usersRefEdit, {
      ...data,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getEvents = async () => {
  try {
    const eventsRef = collection(db, "events");
    const events = await getDocs(eventsRef);
    return events.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEvent = async (eventId = "") => {
  try {
    const q = query(collection(db, "events"), where("eventId", "==", eventId));
    const docs = await getDocs(q);
    // console.log(docs);
    return docs.docs[0].data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createEvent = async (data) => {
  try {
    const eventObj = {
      eventId: uuid.v4().split("-")[0] + uuid.v4().split("-")[0],
      title: data.title,
      description: data.description,
      category: data.category,
      attendees: [],
      location: data.location,
      image: data.image,
      dateOfEvent: data.dateOfEvent,
      organizer: data.organizer,
    };
    await addDoc(collection(db, "events"), eventObj);
    const userObj = await getUser();
    const { eventsCreated, docId } = userObj;
    const usersRefEdit = doc(db, "users", docId);
    await updateDoc(usersRefEdit, {
      eventsCreated: eventsCreated.concat(eventObj.eventId),
    });
    return eventObj;
  } catch (err) {
    console.error(err);
  }
};

export const editEvent = async (data) => {
  try {
    const { eventId } = data;
    const eventsRef = query(
      collection(db, "events"),
      where("eventId", "==", eventId)
    );
    const docs = await getDocs(eventsRef);
    if (docs.docs.length === 0) {
      throw new Error("event doesnt exist");
    }
    const documentId = docs.docs[0].id;
    const eventsRefEdit = doc(db, "events", documentId);
    await updateDoc(eventsRefEdit, {
      ...data,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const addAttendeeToEvent = async (data) => {
  try {
    const { eventId, userId } = data;
    const eventsRef = query(
      collection(db, "events"),
      where("eventId", "==", eventId)
    );
    const docs = await getDocs(eventsRef);
    if (docs.docs.length === 0) {
      throw new Error("event doesnt exist");
    }
    const documentId = docs.docs[0].id;
    const { attendees } = docs.docs[0].data();
    const eventsRefEdit = doc(db, "events", documentId);
    await updateDoc(eventsRefEdit, {
      attendees: attendees.concat(userId),
    });
    return attendees.concat(userId);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const removeAttendeeFromEvent = async (data) => {
  try {
    const { eventId, userId } = data;
    const eventsRef = query(
      collection(db, "events"),
      where("eventId", "==", eventId)
    );
    const docs = await getDocs(eventsRef);
    if (docs.docs.length === 0) {
      throw new Error("event doesnt exist");
    }
    const documentId = docs.docs[0].id;
    const { attendees } = docs.docs[0].data();
    const eventsRefEdit = doc(db, "events", documentId);
    await updateDoc(eventsRefEdit, {
      attendees: attendees.filter((attendee) => attendee !== userId),
    });
    return attendees.filter((attendee) => attendee !== userId);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getNamesOfAttendees = async (eventId) => {
  try {
    const eventsRef = query(
      collection(db, "events"),
      where("eventId", "==", eventId)
    );
    const docs = await getDocs(eventsRef);
    if (docs.docs.length === 0) {
      throw new Error("event doesnt exist");
    }
    const { attendees } = docs.docs[0].data();
    const usersRef = collection(db, "users");
    const userDocs = await getDocs(usersRef);
    const userNames = attendees.map((attendee) => {
      const user = userDocs.docs.find((doc) => doc.data().uid === attendee);
      return `${user.data().name} - ${user.data().email}`;
    });
    return userNames;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getOrganizerInfo = async (eventId = "") => {
  // Retrieve the event organizer's info based on the eventId
  // Use only in the event detail page (I guess)

  try {
    const q = query(collection(db, "events"), where("eventId", "==", eventId));
    const docs = await getDocs(q);
    let q_data = docs.docs[0].data();

    const r = query(
      collection(db, "users"),
      where("uid", "==", q_data.organizer)
    );
    const docs_ = await getDocs(r);
    // console.log(docs_);
    return docs_.docs[0].data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = () => signOut(auth);
