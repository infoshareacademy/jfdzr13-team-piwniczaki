import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, db } from "../utils/firebase"; // Ensure db is imported correctly
type AdditionalUserInfo = {
  name: string;
  surname: string;
  city: string;
  phone: number;
};
interface AuthContextData {
  currentUser: any;
  login: (email: string, password: string) => Promise<void>;
  authenticateWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  savePersonalData: (userData: AdditionalUserInfo) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const addNewUserToDatabase = async (user: any) => {
    const usersdata = await getDocs(collection(db, "Users"));
    const data = usersdata.docs.map((document) => document.data());
    const findUid = data.some((existingUser) => existingUser.uid === user.uid);

    if (!findUid) {
      await addDoc(collection(db, "Users"), {
        uid: user.uid,
      });
    }
  };

  const updateUserToDatabase = async (uid: string, data: any) => {
    // aktualizuję użytkownika, zapisuję do bazy
    const usersSnapshot = await getDocs(
      query(collection(db, "Users"), where("uid", "==", uid))
    );

    if (usersSnapshot.docs.length === 1) {
      const usersCollectionId = usersSnapshot.docs[0].id;

      await setDoc(doc(db, "Users", usersCollectionId), data, {
        merge: true,
      });
    }
  };

  const getUserFromDatabase = async (uid: string) => {
    // pobiera z bazy
    const usersSnapshot = await getDocs(
      query(collection(db, "Users"), where("uid", "==", uid))
    );

    if (!usersSnapshot.docs.length) {
      return null;
    }

    return {
      id: usersSnapshot.docs[0].id,
      ...usersSnapshot.docs[0].data(),
    };
  };

  function login(email: string, password: string) {
    return toast.promise(signInWithEmailAndPassword(auth, email, password), {
      loading: "Logowanie...",
      success: <b>Zostałeś zalogowany</b>,
      error: (err) => <b>Błąd: {err.message}</b>,
    });
  }

  function authenticateWithGoogle() {
    const provider = new GoogleAuthProvider();
    return toast.promise(
      signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        await addNewUserToDatabase(user);
      }),
      {
        loading: "Logowanie...",
        success: <b>Zostałeś zalogowany przez Google</b>,
        error: (err) => <b>Błąd: {err.message}</b>,
      }
    );
  }

  function register(email: string, password: string) {
    return toast.promise(
      createUserWithEmailAndPassword(auth, email, password).then(
        async (result) => {
          const user = result.user;
          await addNewUserToDatabase(user);
        }
      ),
      {
        loading: "Rejestrowanie",
        success: <b>Zarejestrowanie poprawnie!</b>,
        error: (err) => <b>Błąd: {err.message}</b>,
      }
    );
  }

  function logout() {
    return toast.promise(signOut(auth), {
      loading: "Wylogowywanie",
      success: <b>Wylogowano!</b>,
      error: (err) => <b>Błąd: {err.message}</b>,
    });
  }

  function savePersonalData(userData: AdditionalUserInfo) {
    // tworzę wpis użytkownika w bazie danych
    return toast.promise(
      new Promise(async (resolve) => {
        await updateUserToDatabase(currentUser.uid, userData);
        //  xyz ma prawo się wykonać kiedy skończy się wykonywać updateUserToDatabase
        resolve(undefined);
      }),
      {
        loading: "Zapisanie danych...",
        success: <b>Zapisano dane</b>,
        error: (err) => <b>Błąd: {err.message}</b>,
      }
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dbUser = await getUserFromDatabase(user.uid);
        // ta funkcja uruchamia się 1) kiedy się loguję 2) wylogowuję. jak się loguję jest, jak wylogowuję null, if żeby nie odpalać szukania id dla null
        if (dbUser) {
          setCurrentUser({
            ...user,
            ...dbUser,
          });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const passedData = {
    currentUser,
    login,
    authenticateWithGoogle,
    register,
    logout,
    savePersonalData,
  };

  return (
    <AuthContext.Provider value={passedData}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
