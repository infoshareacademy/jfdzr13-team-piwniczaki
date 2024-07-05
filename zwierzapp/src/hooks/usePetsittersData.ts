import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const usePetsittersData = async () => {
  try {
    const snapshot = await getDocs(collection(db, "Petsitters"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error getting petsitter documents: ", error);
  }
};

export default usePetsittersData;
