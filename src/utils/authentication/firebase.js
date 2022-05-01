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
    return docs.docs[0].data();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const editUser = async (data) => {
  try {
    const { uid } = auth.currentUser;
    const usersRef = doc(db, "users", uid);
    await updateDoc(usersRef, {
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
    console.log(docs);
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
    alert("Creating fake event with id: " + eventObj.eventId);
    await addDoc(collection(db, "events"), eventObj);
    return eventObj;
  } catch (err) {
    console.error(err);
  }
};

export const getOrganizerInfo = async (eventId = "") => {
  // Retrieve the event organizer's info based on the eventId
  // Use only in the event detail page (I guess)

  try {
    const q = query(collection(db, "events"), where("eventId", "==", eventId));
    const docs = await getDocs(q);
    let q_data = docs.docs[0].data();

    const r = query(collection(db, "users"), where("uid", "==", q_data.organizer));
    const docs_ = await getDocs(r);
    console.log(docs_);
    return docs_.docs[0].data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = () => signOut(auth);
