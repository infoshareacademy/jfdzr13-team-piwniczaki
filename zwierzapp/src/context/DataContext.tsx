import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
  } from "firebase/firestore";
  import { createContext, useContext } from "react";
  import { db } from "../utils/firebase"; 
  

interface DataContextInterface {
    saveUserToDatabase: (uid: string, data: any) => Promise<void>;
    updateUserToDatabase: (collectionName: string, uid: string, data: any) => Promise<void>;
    getUsersDocs: (collectionName: string, uid: string) => Promise<any[] | null>;
    getUserFromDatabase:(collectionName: string, uid: string, data: any) => Promise<void>;
    currentUser: any;

  }
  
  
  const DataContext = createContext<DataContextInterface | null>(null);
  
  const useData = () => useContext(DataContext);
  
  export const DataProvider = ({ children }: { children: React.ReactNode }) => {
 
   
   const saveUserToDatabase = async (uid:string, data:any) => {
    const docRef = doc(collection(db, 'petsitters'), uid);
    await setDoc(docRef, data);
      };

  const updateUserToDatabase = async (collectionName:string, uid: string, data: any) => {
    const usersSnapshot = await getDocs(
      query(collection(db, collectionName), where("uid", "==", uid))
    );

    if (usersSnapshot.docs.length === 1) {
      const usersCollectionId = usersSnapshot.docs[0].id;

      await setDoc(doc(db, collectionName, usersCollectionId), data, {
        merge: true,
      });
    }
  };

  const getUserFromDatabase = async (collectionName:string, uid: string) => {
    const usersSnapshot = await getDocs(
      query(collection(db, collectionName), where("uid", "==", uid))
    );

    if (!usersSnapshot.docs.length) {
      return null;
    }

    return {
      id: usersSnapshot.docs[0].id,
      ...usersSnapshot.docs[0].data(),
    };
  };

  const getUsersDocs = async (collectionName:string, uid: string) => {
    const usersSnapshot = await getDocs(
        query(collection(db, collectionName), where('userID', '==', uid))
    );

    if (!usersSnapshot.docs.length) {
        return null;
    }

    const userData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return userData;
  }

  const passedData = {
    getUsersDocs,
    saveUserToDatabase,
    updateUserToDatabase,
    getUserFromDatabase
  };

  return (
    <DataContext.Provider value={passedData}>{children}</DataContext.Provider>
  );
};

export default useData;
