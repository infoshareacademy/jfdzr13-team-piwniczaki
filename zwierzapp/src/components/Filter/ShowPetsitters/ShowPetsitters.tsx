import PetsitterBar from "../PetsitterBar/PetsitterBar";
import styles from "./ShowPetsitters.module.scss";
const ShowPetsitters = () => {
  return (
  <div className={styles.petsittersContainer}>
    <label>
      sortuj według
      <select>
        <option>kwota rosnąco</option>
        <option>kwota malejąco</option>
        <option>alfabetycznie (A-Z)</option>
        <option>alfabetycznie (Z-A)</option>
      </select>
    </label>
    <PetsitterBar/>
  </div>
)};

export default ShowPetsitters;
