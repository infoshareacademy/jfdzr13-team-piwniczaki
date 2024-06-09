import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import toast from 'react-hot-toast';
import { auth } from "../utils/firebase.ts";

interface AuthContextData {
    currentUser: any; 
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);;

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


    const [currentUser, setCurrentUser] = useState(null);


    function login(email: string, password: string) {
        toast.promise(
            signInWithEmailAndPassword(auth, email, password),
            {
                loading: 'Logowanie..',
                success: <b>Zostałeś zalogowany</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
    }
    function authenticateWithGoogle() {
        const provider = new GoogleAuthProvider();
        return toast.promise(
            signInWithPopup(auth, provider),
            {
                loading: 'Logowanie..',
                success: <b>Zostałeś zalogowany</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
    }
    function register(email: string, password: string) {
         return toast.promise(
            createUserWithEmailAndPassword(auth, email, password),
            {
                loading: 'Rejestrowanie',
                success: <b>Zarejestrowanie poprawnie!</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
    }
    
    function logout() {
        toast.promise(
            signOut(auth),
            {
                loading: 'Wylogowywanie',
                success: <b>Wylogowano!</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
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
        authenticateWithGoogle,
        register,
        logout
    }


    return <AuthContext.Provider value={passedData}>{children}</AuthContext.Provider>
}

export default useAuth;