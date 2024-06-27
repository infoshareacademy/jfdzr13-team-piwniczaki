import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";
import { User } from "../context/AuthContext";

interface PassedUserId {
  uid: string;
}

const getUserData = (user: PassedUserId): User | null => {
  const currentUserId = user.uid;
  const users: User[] = useFirebaseData("Users");
  const [userDocument, setUserDocument] = useState<User | null>(null);
  useEffect(() => {
    if (currentUserId && users.length > 0) {
      const foundUserDocument = users.find(
        (user) => user.uid === currentUserId
      );
      setUserDocument(foundUserDocument || null);
    }
  }, [currentUserId, users]);
  return userDocument;
};

export default getUserData;
