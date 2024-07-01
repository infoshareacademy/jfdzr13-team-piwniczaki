import styles from "./addCare.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../../context/AuthContext";
import { db } from "../../../../../utils/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import getPetsitterData from "../../../../../hooks/getPetsitterData";
import toast from 'react-hot-toast';
import Loading from "../../../../Loading/Loading";

function AddCare() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth() || {};
  const [accessDates, setAccessDates] = useState([]);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const currentDate = new Date().toISOString().split('T')[0];
  const databasePetsitter = getPetsitterData(currentUser?.uid);

  useEffect(() => {
    setLoading(true)
    if (databasePetsitter) {
      setAccessDates(databasePetsitter.access || []);
      setDocumentId(databasePetsitter.id);
    }
    if(databasePetsitter){
      setLoading(false)
    }
  }, [databasePetsitter]);

  const addNewDate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const careCity = formData.get("city");

    if (documentId && startDate && endDate && careCity) {
      if (endDate < startDate) {
        toast.error("Wybrana data początkowy jest póżniejsza niż wybrana data końcowa");
        return;
      }
      const newDate = { startDate, endDate, careCity };
      try {
        const docRef = doc(db, "Petsitters", documentId);
        await updateDoc(docRef, {
          access: arrayUnion(newDate),
        });
        toast.success("Dodano poprawnie");
        setAccessDates(prevDates => [...prevDates, newDate]);
        form.reset();
      } catch (error) {
        toast.error("Błąd wysyłania danych");

      }
    } else {
      toast.error("Nie znaleziono użytkownika lub brak daty");
    }
  };

  const removeRecord = async (dateToRemove) => {
    if (documentId) {
      try {
        const docRef = doc(db, "Petsitters", documentId);
        await updateDoc(docRef, {
          access: arrayRemove(dateToRemove),
        });
        toast.success("Skasowano poprawnie");
        setAccessDates(prevDates => prevDates.filter(date => date !== dateToRemove));
      } catch (error) {
        toast.error("Błąd usuwania danych");
      }
    } else {
      toast.error("Nie znaleziono użytkownika");
    }
    
  };

  if (loading) {
    return <Loading message={`Ładowanie danych`} />
  }
  return (
    <div className={styles.addcareContainer}>
      {accessDates.length === 0 ? (
        <p className={styles.emptyState}>Brak dostępnych dat</p>
      ) : (
        <>
          <div className={styles.dateTittle}>
            <span className={styles.tittleAcc}>Początek</span>
            <span className={styles.tittleAcc}>Koniec</span>
            <span className={styles.tittleAcc}>Lokalizacja</span>
          </div>
          {accessDates.map((date, index) => (
            <div key={index} className={styles.dateContainer}>
              <input type="date" value={date.startDate} readOnly></input>
              <input type="date" value={date.endDate} readOnly></input>
              <input type="text" value={date.careCity} readOnly></input>
              <button onClick={() => removeRecord(date)}>Skasuj</button>
            </div>
          ))}
        </>
      )}
      <div className={styles.formContainer}>
        <form onSubmit={addNewDate} className={styles.dateContainer}>
          <input type="date" name="startDate" min={currentDate} required></input>
          <input type="date" name="endDate" min={currentDate} required></input>
          <input type="text" name="city" required></input>
          <button type="submit">Dodaj</button>
        </form>
      </div>
      <Link to="/profile" className={styles.becomePetSitterLink}>Wróć</Link>
    </div>
  );
}

export default AddCare;
