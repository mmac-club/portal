import React, {useContext, useEffect, useState} from "react";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


const AuthContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    async function signup(user) {
        const authInstance = getAuth(); // Get the authentication instance
        const userCredential = await createUserWithEmailAndPassword(authInstance, user.email, user.password);
        console.log("Sign Up Successful")
        return userCredential;
    }

    async function login(user) {
        console.log(user)
        const authInstance = getAuth();
        const userCredential = await signInWithEmailAndPassword(authInstance, user.email, user.password);
        return userCredential; 
    }

    async function logout() {
        const authInstance = getAuth();
        const userCredential = await signOut(authInstance);
        return userCredential; 
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}