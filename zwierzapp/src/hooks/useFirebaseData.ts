import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase.ts";

const useFirebaseData = (collectionName: string) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((document) => document.data());

    setData(data);
  };

  useEffect(() => {
    fetchData();

    return () => {
      fetchData();
    };
  }, []);

  return data;
};

export default useFirebaseData;
