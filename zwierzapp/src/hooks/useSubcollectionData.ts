import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const useSubcollectionData = (
  collectionName: string,
  subcollectionName: string,
  docId: string
) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, collectionName, docId);
      const subcollectionRef = collection(docRef, subcollectionName);

      const querySnapshot = await getDocs(subcollectionRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(documents);
    };
    fetchData();
  }, [collectionName]);

  return data;
};

export default useSubcollectionData;
