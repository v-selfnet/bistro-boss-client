import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from "../Firebase/firebase.config";

export const AuthContext = createContext(null)

const auth = getAuth(app) 

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider()

    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //signin
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName : name, photoURL: photo
        })
    }

    // google signin
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Auth State Change
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, cUser => {
            setUser(cUser);
            // console.log('current user:', cUser)
            setLoading(false)
        });
        return () => unsubscribe;
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;