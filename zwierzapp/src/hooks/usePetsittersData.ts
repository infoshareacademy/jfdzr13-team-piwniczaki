import { useEffect, useState } from "react";
import useFirebaseData from "./useFirebaseData";
import { PetsitterDocument } from "./getPetsitterData";
import { User } from "firebase/auth";
import useAuth from "../context/AuthContext";

const usePetsittersData = () => {
  const petsitters: PetsitterDocument[] = useFirebaseData("Petsitters");
  const [petsitterDocument, setPetsitterDocument] = useState<
    PetsitterDocument[]
  >([]);
  const { currentUser }: { currentUser: User | null } = useAuth() || {
    currentUser: null,
  };

  useEffect(() => {
    if (currentUser?.uid && petsitters.length > 0) {
      const foundPetDocuments = petsitters.filter(
        (petsitter) => petsitter.id === currentUser.uid
      );
      setPetsitterDocument(foundPetDocuments);
    }
  }, [currentUser?.uid, petsitters]);

  return petsitterDocument;
};

export default usePetsittersData;
