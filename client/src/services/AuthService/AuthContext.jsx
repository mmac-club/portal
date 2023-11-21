import React, {useContext, useEffect, useState} from "react";
import { auth } from "../../contexts/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import UserManagementService from "../UserManagementService/UserManagement";

const AuthContext = React.createContext()
const userManagementService = new UserManagementService();
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
        try {
            const userCredential = await createUserWithEmailAndPassword(authInstance, user.email, user.password);
            try {
                const userData = { ...user };
                const res = await userManagementService.register(userData);
                console.log(res)
            }
            catch (error) {
                throw error.message
            }
            return userCredential;
        } 
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle different error codes and messages
            if (errorCode === "auth/email-already-in-use") {
                // Email is already registered
                throw "User already exists";
            } else if (errorCode === "auth/invalid-email") {
                // Invalid email format
                throw "Invalid email format";
            } else if (errorCode === "auth/weak-password") {
                // Weak password
                throw "Password is too weak";
            } else {
                // Handle other errors and return the error message
                throw errorMessage;
            }
        }
    }

    async function login(user) {
        const authInstance = getAuth();
        
        try {
            const userCredential = await signInWithEmailAndPassword(authInstance, user.email, user.password);
            return userCredential;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        
            // Handle different error codes and messages
            if (errorCode === "auth/user-not-found") {
                // User not found
                throw "User not found";
            } else if (errorCode === "auth/invalid-email") {
                // Invalid email format
                throw "Invalid email format";
            } else if (errorCode === "auth/wrong-password") {
                // Incorrect password
                throw "Incorrect password";
            } else {
                // Handle other errors and return the error message
                throw errorMessage;
            }
        }
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