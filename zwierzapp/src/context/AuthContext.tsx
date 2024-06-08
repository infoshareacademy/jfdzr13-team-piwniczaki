import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase.tsx";

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

    const [currentUser, setCurrentUser] = useState<any>(null);

    function login(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)

    }
    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
        

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