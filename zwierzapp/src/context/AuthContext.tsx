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
import { auth, db } from "../utils/firebase"; // Ensure db is imported correctly
import { addDoc, getDocs, collection } from "firebase/firestore";

interface AuthContextData {
    currentUser: any; 
    login: (email: string, password: string) => Promise<void>;
    authenticateWithGoogle: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    function login(email: string, password: string) {
        return toast.promise(
            signInWithEmailAndPassword(auth, email, password),
            {
                loading: 'Logowanie...',
                success: <b>Zostałeś zalogowany</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
    }

    const addNewUserToDatabase = async (user: any) => {
        const usersdata = await getDocs(collection(db, "Users"));
        const data = usersdata.docs.map((document) => document.data());
        const findUid = data.some(existingUser => existingUser.uid === user.uid);

        if (!findUid) {
            await addDoc(collection(db, "Users"), {
                uid: user.uid,
            });
        }
    };

    function authenticateWithGoogle() {
        const provider = new GoogleAuthProvider();
        return toast.promise(
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const user = result.user;
                    await addNewUserToDatabase(user);
                }),
            {
                loading: 'Logowanie...',
                success: <b>Zostałeś zalogowany przez Google</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
    }

    function register(email: string, password: string) {
        return toast.promise(
            createUserWithEmailAndPassword(auth, email, password)                .then(async (result) => {
                const user = result.user;
                await addNewUserToDatabase(user);
            }),
            {
                loading: 'Rejestrowanie',
                success: <b>Zarejestrowanie poprawnie!</b>,
                error: (err) => <b>Błąd: {err.message}</b>,
            }
        );
    }

    function logout() {
        return toast.promise(
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
        logout,
    };

    return <AuthContext.Provider value={passedData}>{children}</AuthContext.Provider>;
};

export default useAuth;
