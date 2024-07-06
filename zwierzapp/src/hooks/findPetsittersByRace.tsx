import { useEffect, useState } from "react";
import { PetDocument } from "./getSinglePetData";
import { useSearchParams } from "react-router-dom";
import useFirebaseData from "./useFirebaseData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

export interface Filters {
  petId?: string | null;
  petAge?: string | null;
  petBehavior?: string | null;
  petDescription?: string | null;
  petName?: string | null;
  petRace?: string | null;
  petSex?: string | null;
  petWeight?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  city?: string | null;
  serviceType?: string | null;
}

const findPetsittersByRace = () => {
  const [queryParameters] = useSearchParams();
  const pets: PetDocument[] = useFirebaseData("Pets");
  const [petObject, setPetObject] = useState<PetDocument | undefined>();
  const [filters, setFilters] = useState<Filters>({
    petId: null,
    petAge: null,
    petBehavior: null,
    petDescription: null,
    petName: null,
    petRace: null,
    petSex: null,
    petWeight: null,
    minPrice: null,
    maxPrice: null,
    startDate: null,
    endDate: null,
    city: null,
    serviceType: null,
  });
console.log('z by race')
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      petId: queryParameters.get("petId"),
      minPrice: queryParameters.get("minPrice"),
      maxPrice: queryParameters.get("maxPrice"),
      startDate: queryParameters.get("startDate"),
      endDate: queryParameters.get("endDate"),
      city: queryParameters.get("city"),
      serviceType: queryParameters.get("serviceType"),
    }));
  }, [queryParameters]);

  useEffect(() => {
    if (filters.petId && pets.length > 0) {
      const foundPetDocument = pets.find((pet) => pet.id === filters.petId);
      setPetObject(foundPetDocument);
    }
  }, [filters.petId, pets]);

  useEffect(() => {
    if (petObject) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        petAge: petObject.age || null,
        petBehavior: petObject.behavior || null,
        petDescription: petObject.description || null,
        petName: petObject.name || null,
        petRace: petObject.race || null,
        petSex: petObject.sex || null,
        petWeight: petObject.weight || null,
      }));
    }
  }, [petObject]);

  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);

  const filterUsers = async () => {
    const queries = [];
    if (filters.petRace === "dog") {
      queries.push(
        query(collection(db, "Petsitters"), where("checkboxes.dog", "==", true))
      );
    }
    if (filters.petRace === "cat") {
      queries.push(
        query(collection(db, "Petsitters"), where("checkboxes.cat", "==", true))
      );
    }

    const userSnapshots = await Promise.all(queries.map((q) => getDocs(q)));
    const users: string[] = userSnapshots.flatMap((snapshot) =>
      snapshot.docs.map((doc) => doc.data().userId as string)
    );

    setFilteredUsers(users);
  };

  useEffect(() => {
    if (filters.petRace) {
      filterUsers();
    }
  }, [filters.petRace]);

  return [filters, filteredUsers];
};

export default findPetsittersByRace;
