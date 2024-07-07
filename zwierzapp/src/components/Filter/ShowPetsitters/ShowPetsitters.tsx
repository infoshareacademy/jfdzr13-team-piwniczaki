import PetsitterBar from "../PetsitterBar/PetsitterBar";
import styles from "./ShowPetsitters.module.scss";
import useFindPetsitters from "../../../hooks/useFindPetsitters";
import { useState, useEffect } from "react";

const ShowPetsitters = () => {
  const [sorting, setSorting] = useState({
    byName: true,
    byPrice: false,
    asc: true,
    desc: false,
  });
  const [filters, sortedPetsitters] = useFindPetsitters(sorting);
  const serviceType = filters.serviceType;
  const race = filters.petRace === "dog" ? "dog" : "cat";

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    let newSortOptions = {
      byName: false,
      byPrice: false,
      asc: false,
      desc: false,
    };

    switch (value) {
      case "kwota rosnąco":
        newSortOptions = {
          byName: false,
          byPrice: true,
          asc: true,
          desc: false,
        };
        break;
      case "kwota malejąco":
        newSortOptions = {
          byName: false,
          byPrice: true,
          asc: false,
          desc: true,
        };
        break;
      case "alfabetycznie (A-Z)":
        newSortOptions = {
          byName: true,
          byPrice: false,
          asc: true,
          desc: false,
        };
        break;
      case "alfabetycznie (Z-A)":
        newSortOptions = {
          byName: true,
          byPrice: false,
          asc: false,
          desc: true,
        };
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.petsittersContainer}>
      {/* <div className={styles.sortContainer}>
        <div className={styles.sort}>
            <label>
            sortuj według
            </label>
            <select onChange={handleSortChange} defaultValue='alfabetycznie (A-Z)' >
              <option value="kwota rosnąco">kwota rosnąco</option>
              <option value="kwota malejąco">kwota malejąco</option>
              <option value="alfabetycznie (A-Z)">alfabetycznie (A-Z)</option>
              <option value="alfabetycznie (Z-A)">alfabetycznie (Z-A)</option>
            </select>
        </div>
      </div> */}

      <PetsitterBar
        petsitters={sortedPetsitters}
        serviceType={serviceType}
        race={race}
        filters={filters}
      />
    </div>
  );
};

export default ShowPetsitters;
