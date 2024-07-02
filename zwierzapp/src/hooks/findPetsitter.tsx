import { useEffect, useState } from "react";
import { PetDocument } from "./getSinglePetData";
import { useSearchParams } from "react-router-dom";
import useFirebaseData from "./useFirebaseData";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

interface Filters {
  petId: string | null;
  petAge: string | null;
  petBehavior: string | null;
  petDescription: string | null;
  petName: string | null;
  petRace: string | null;
  petSex: string | null;
  petWeight: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  startDate: string | null;
  endDate: string | null;
  city: string | null;
  serviceType: string | null;
}

const findPetsitter = () => {
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

  useEffect(() => {
    setFilters({
      petId: queryParameters.get("petId"),
      minPrice: queryParameters.get("minPrice"),
      maxPrice: queryParameters.get("maxPrice"),
      startDate: queryParameters.get("startDate"),
      endDate: queryParameters.get("endDate"),
      city: queryParameters.get("city"),
      serviceType: queryParameters.get("serviceType"),
      petAge: filters.petAge,
      petBehavior: filters.petBehavior,
      petDescription: filters.petDescription,
      petName: filters.petName,
      petRace: filters.petRace,
      petSex: filters.petSex,
      petWeight: filters.petWeight,
    });
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

  //start filters

  // const isDog = filters.petRace === "dog";
  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filterUsers = async () => {
    if (filters.petRace === "dog") {
      setIsDog(true);
    } else {
      setIsDog(false);
    }
    if (filters.petRace === "cat") {
      setIsCat(true);
    } else {
      setIsCat(false);
    }

    if (isCat) {
      const usersSnapshot: object | null = await getDocs(
        query(collection(db, "Petsitters"), where("checkboxes.cat", "==", true))
      );
      if (usersSnapshot.docs) {
        setFilteredUsers(
          usersSnapshot.docs.map(
            (doc) => doc._document.data.value.mapValue.fields.userId.stringValue
          )
        );
      }
    } else if (isDog) {
      const usersSnapshot: object | null = await getDocs(
        query(collection(db, "Petsitters"), where("checkboxes.dog", "==", true))
      );
      if (usersSnapshot.docs) {
        setFilteredUsers(
          usersSnapshot.docs.map(
            (doc) => doc._document.data.value.mapValue.fields.userId.stringValue
          )
        );
      }
    }
  };

  useEffect(() => {
    filterUsers();
  }, [filters, isDog, isCat]);

  console.log(filteredUsers);

  return [filters, filteredUsers];
};

export default findPetsitter;
