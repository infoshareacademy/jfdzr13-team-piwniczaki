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
    currentUser: any;
    saveUserToDatabase:any;
    updateUserToDatabase:any;
    getUserFromDatabase:any;
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

  const passedData = {
    saveUserToDatabase,
    updateUserToDatabase,
    getUserFromDatabase
  };

  return (
    <DataContext.Provider value={passedData}>{children}</DataContext.Provider>
  );
};

export default useData;
