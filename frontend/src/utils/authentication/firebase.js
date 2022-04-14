import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, addDoc, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

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
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);
        // if (docs.docs.length === 0) {
        //     await addDoc(collection(db, "users"), {
        //         uid: user.uid,
        //         name: user.displayName,
        //         authProvider: "google",
        //         email: user.email,
        //     });
        // }
        return user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logout = () => signOut(auth);
