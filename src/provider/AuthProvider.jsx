import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.config';




const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);


        });
        return () => {
            unsubscribe();
        }
    }, []);

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                toast.success("Sign Out Successfully");
                setUser(null);

            })
            .catch((error) => {
                console.error("Error signing out:", error);

            });
    }
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }
    const authData = {
        user,
        setUser,
        createUser,
        signIn,
        handleSignOut,
        loading,
        setLoading,
        updateUser,
        signInWithGoogle,
    }
    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;