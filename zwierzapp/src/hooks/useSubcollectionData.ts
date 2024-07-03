import { getFirestore, doc, collection, getDocs } from "firebase/firestore";

const useSubcollectionData = async (
  collectionName: string,
  subcollectionName: string,
  docId: string
) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, collectionName, docId);
    const subcollectionRef = collection(docRef, subcollectionName);

    const snapshot = await getDocs(subcollectionRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error getting subcollection documents: ", error);
  }
};

export default useSubcollectionData;
