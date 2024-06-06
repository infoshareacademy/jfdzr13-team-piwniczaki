import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentUser, setCurrentUser] = useState(null);

    function login(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)

    }
    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }
    function register(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password);
    }
    function logout() {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const passedData = {
        currentUser,
        login,
        loginWithGoogle,
        register,
        logout
    }


    return <AuthContext.Provider value={passedData}>{children}</AuthContext.Provider>
}

export default useAuth;