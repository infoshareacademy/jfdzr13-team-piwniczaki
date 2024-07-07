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
import { avatars } from "../components/AddDataForm/AddAvatar/AddAvatar";
import Loading from "../components/Loading/Loading";
import { auth, db } from "../utils/firebase";


export interface User {
  uid: string;
  name?: string;
  surname?: string;
  phone?: number;
  city?: string;
  descLong?: string;
  descShort?: string;
  email?: string;
}

export type AdditionalUserInfo = {
  name: string;
  surname: string;
  city: string;
  phone: string;
  email: string;
  avatar: { id: number; photo: string; alt: string };
};

interface AuthContextData {
  currentUser: any;
  login: (email: string, password: string) => Promise<void>;
  authenticateWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  savePersonalData: (userData: AdditionalUserInfo) => Promise<void>;
  avatar: { id: number; photo: string; alt: string };
  handleAvatar: (avatarEntry: {
    id: number;
    photo: string;
    alt: string;
  }) => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [avatar, setAvatar] = useState(avatars[0]);

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
      error: <b>Podany adres email lub hasło są niepoprawne!</b>,
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
        error: (err) => {
          if (err.code === "auth/email-already-in-use") {
            return <b>Istnieje już użytkownik o takim adresie email!</b>;
          }
          return <b>Rejestracja nie powiodła się!</b>;
        },
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

  async function savePersonalData(userData: AdditionalUserInfo) {
    try {
      await updateUserToDatabase(currentUser.uid, userData);

      setCurrentUser((prev: any) => ({
        ...prev,
        ...userData,
      }));

      toast.success("Zapisano poprawnie dane");
    } catch (error) {
      console.error(error);
    }
  }

  const handleAvatar = (avatarEntry: {
    id: number;
    photo: string;
    alt: string;
  }) => {
    setAvatar(avatarEntry);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dbUser = await getUserFromDatabase(user.uid);
        if (dbUser) {
          setCurrentUser({
            ...user,
            ...dbUser,
          });
          setLoading(false);
        } else {
          setCurrentUser(user);
          setLoading(false);
        }
      } else {
        setCurrentUser(user); // null
        setLoading(false);
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
    avatar,
    handleAvatar,
  };
  if (isLoading) {
    return <Loading message="Ładowanie użytkownika" />;
  }

  return (
    <AuthContext.Provider value={passedData}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
