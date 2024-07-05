import PetsitterBar from "../PetsitterBar/PetsitterBar";
import styles from "./ShowPetsitters.module.scss";
import useFindPetsitters from "../../../hooks/useFindPetsitters";
import { useState } from "react";

const ShowPetsitters = () => {

  const [sorting, setSorting] = useState({
    byName: true, byPrice: false, asc: true, desc: false 
  })
  const filterObj = useFindPetsitters(sorting)
  const serviceType = filterObj[0].serviceType;
  const race = filterObj[0].petRace=== "dog" ? "dog" : "cat";

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    let newSortOptions = {
      byName: false,
      byPrice: false,
      asc: false,
      desc: false,
    };

    switch (value) {
      case 'kwota rosnąco':
        newSortOptions = { byName: false, byPrice: true, asc: true, desc: false };
        break;
      case 'kwota malejąco':
        newSortOptions = { byName: false, byPrice: true, asc: false, desc: true };
        break;
      case 'alfabetycznie (A-Z)':
        newSortOptions = { byName: true, byPrice: false, asc: true, desc: false };
        break;
      case 'alfabetycznie (Z-A)':
        newSortOptions = { byName: true, byPrice: false, asc: false, desc: true };
        break;
      default:
        break;
    }

    setSorting(newSortOptions);
  };
  // useFindPetsitters(sorting)
  // console.log(
  // useFindPetsitters(sorting)
    console.log(useFindPetsitters(sorting))
    console.log('heja z sorting',sorting)
  // );
  
  return (
  <div className={styles.petsittersContainer}>
    <label>
      sortuj według
      <select onChange={handleSortChange} defaultValue='alfabetycznie (A-Z)'>
        <option value="kwota rosnąco">kwota rosnąco</option>
        <option value="kwota malejąco">kwota malejąco</option>
        <option value="alfabetycznie (A-Z)">alfabetycznie (A-Z)</option>
        <option value="alfabetycznie (Z-A)">alfabetycznie (Z-A)</option>
      </select>
    </label>
    <PetsitterBar sorting={sorting} serviceType={serviceType} race={race}/>
  </div>
)};

export default ShowPetsitters;
