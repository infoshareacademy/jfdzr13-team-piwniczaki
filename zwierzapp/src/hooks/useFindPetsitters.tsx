import { useEffect, useState } from "react";
import { PetsitterDocument } from "./getPetsitterData";
import useSubcollectionData from "./useSubcollectionData";
import findPetsittersByRace, { Filters } from "./findPetsittersByRace";
import usePetsittersData from "./usePetsittersData";
import useUsersData from "./useUsersData";
import useSort from "./useSort";
import useFilter from "./useFilter";
import useSearchbarFilters from "./useSearchbarFilters";
import { useSearchParams } from "react-router-dom";
import { query } from "firebase/firestore";
import usePetData from "./usePetData";
import useFirebaseData from "./useFirebaseData";

const useFindPetsitters = (sortParam: object): [PetsitterDocument[]] => {
  // useEffect(() => {
  //   const fetchAccessData = async () => {
  //     try {
  //       const petsittersData = await usePetsittersData();

  //       // Filter the petsitters based on the given IDs
  //       const filteredPetsitters = petsittersData.filter((petsitter) =>
  //         petsitterIds.includes(petsitter.userId)
  //       );

  //       // Fetch access data for each petsitter
  //       const petsittersWithAccessData = await Promise.all(
  //         filteredPetsitters.map(async (petsitter) => {
  //           try {
  //             const accessData = await useSubcollectionData(
  //               "Petsitters",
  //               "access",
  //               petsitter.id
  //             );
  //             return { ...petsitter, access: accessData };
  //           } catch (error) {
  //             console.error(
  //               `Error fetching access data for ${petsitter.id}`,
  //               error
  //             );
  //             return { ...petsitter, access: [] };
  //           }
  //         })
  //       );

  //       // Fetch user data for each petsitter with access data
  //       const petsittersWithUsersData = await Promise.all(
  //         petsittersWithAccessData.map(async (petsitter) => {
  //           try {
  //             const usersData = await useUsersData();
  //             const userData = usersData.find(
  //               (user) => user.uid === petsitter.userId
  //             );
  //             return { ...petsitter, userData: userData };
  //           } catch (error) {
  //             console.error(
  //               `Error fetching user data for ${petsitter.id}`,
  //               error
  //             );
  //             return { ...petsitter, userData: {} };
  //           }
  //         })
  //       );

  //       // Update the state with the final combined data
  //       setPetsitters(petsittersWithUsersData);
  //     } catch (error) {
  //       console.error("Error fetching petsitters data", error);
  //     }
  //   };

  //   fetchAccessData();
  // }, [petsitterIds, filters]);
  // const petData = usePetData(filters?.petId);

  // console.log(petData);

  //tu zaczynamy nowy skrypt

  //tworzenie obiektu filters
  const searchObj = useSearchbarFilters();
  const petObj = usePetData(searchObj.petId);
  const filters = { ...searchObj, ...petObj };

  //tworzenie listy petsitterow
  const [petsitters, setPetsitters] = useState([]);
  const petsittersDb = useFirebaseData("Petsitters");
  setPetsitters(petsittersDb);

  //dodanie do kazdego petsittera odpowiadajacej subkolekcji access
  const accessObj = useSubcollectionData("Petsitters", "access", petsitter.id);

  // const filteredPetsitters = useFilter(petsitters, filters);
  // const sortedPetsitters = useSort(sortParam, filteredPetsitters, filters);

  // console.log(sortedPetsitters);

  return ["somenthing"];
};

export default useFindPetsitters;
