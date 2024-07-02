import findPetsitter from "../../../hooks/findPetsitter";
import styles from "./ShowPetsitters.module.scss";
import {PetsitterBar} from '../PetsitterBar/PetsitterBar'
const ShowPetsitters = () => {
  // console.log(findPetsitter());
  findPetsitter();
  return (
  <div className={styles.petsittersContainer}>
  <PetsitterBar/>
    
    
  </div>;
)};

export default ShowPetsitters;
