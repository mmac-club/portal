import React, {useContext, useEffect, useState} from "react";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const AuthContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState()
    
    function signup(email, password){
        const authInstance = getAuth(); // Get the authentication instance
        return createUserWithEmailAndPassword(authInstance, email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export async function googleAuthenicator() {
    try {
        const response = await signInWithPopup(getAuth(),new GoogleAuthProvider());
        console.log(response);
    } catch (err){
        console.error(err);
    }
}

export async function facebookAuthenticator() {
    try {
        console.log("Logging with Facebook");
    } catch (err) {
        console.error(err);
    }
}