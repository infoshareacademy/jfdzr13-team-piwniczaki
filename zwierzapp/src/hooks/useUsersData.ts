import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const useUsersData = async () => {
  try {
    const snapshot = await getDocs(collection(db, "Users"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error getting users documents: ", error);
  }
};

export default useUsersData;
