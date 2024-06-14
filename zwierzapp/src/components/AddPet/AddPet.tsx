import styles from "./addPet.module.scss";
import { Link } from "react-router-dom";
import InputDataPet from "./InputDataPet/InputDataPet";
import arrowback from "../../images/arrow_back.svg"

function AddPet() {



  return (
    <div className={styles.addpetContainer}>

      <div className={styles.containerForm}>
        <div className={styles.getBackContainer}>
          <Link to="/" className={styles.getBackElement}><img src={arrowback}></img>wróć</Link>
        </div>
        <InputDataPet/>
        <Link to="/" className={styles.buttonToCancel} >Anuluj</Link>
      </div>
    </div>
  )
}

export default AddPet