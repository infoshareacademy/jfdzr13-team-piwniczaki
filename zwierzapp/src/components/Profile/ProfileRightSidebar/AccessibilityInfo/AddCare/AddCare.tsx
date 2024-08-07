import styles from "./addCare.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../../context/AuthContext";
import { db } from "../../../../../utils/firebase";
import { doc, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
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
    const fetchAccessDates = async (docId) => {
      const accessCollectionRef = collection(db, "Petsitters", docId, "access");
      const snapshot = await getDocs(accessCollectionRef);
      const dates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccessDates(dates);
      setLoading(false);
    };

    if (databasePetsitter) {
      setDocumentId(databasePetsitter.id);
      fetchAccessDates(databasePetsitter.id);

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
        toast.error("Wybrana data początkowy jest późniejsza niż wybrana data końcowa");
        return;
      }
      const newDate = { startDate, endDate, careCity };
      try {
        const accessCollectionRef = collection(db, "Petsitters", documentId, "access");
        const docRef = await addDoc(accessCollectionRef, newDate);
        toast.success("Dodano poprawnie");
        setAccessDates(prevDates => [...prevDates, { id: docRef.id, ...newDate }]);
        form.reset();
      } catch (error) {
        toast.error("Błąd wysyłania danych");
      }
    } else {
      toast.error("Nie znaleziono użytkownika lub brak daty");
    }
  };

  const removeRecord = async (dateToRemove) => {
    if (documentId && dateToRemove.id) {
      try {
        const docRef = doc(db, "Petsitters", documentId, "access", dateToRemove.id);
        await deleteDoc(docRef);
        toast.success("Skasowano poprawnie");
        setAccessDates(prevDates => prevDates.filter(date => date.id !== dateToRemove.id));
      } catch (error) {
        toast.error("Błąd usuwania danych");
      }
    } else {
      toast.error("Nie znaleziono użytkownika");
    }
  };

  if (loading) {
    return <Loading message="Ładowanie danych" />;
  }

  return (
    <div className={styles.addcareContainer}>
      {accessDates.length === 0 ? (
        <>
          <p className={styles.emptyState}>Brak dostępnych dat</p>
          <div className={styles.dateTittle}>
            <span className={styles.tittleAcc}>Początek</span>
            <span className={styles.tittleAcc}>Koniec</span>
            <span className={styles.tittleAcc}>Lokalizacja</span>
          </div>
        </>
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
              <button onClick={() => removeRecord(date)} className={`${styles.returnButton} ${styles.primaryButton}`}>Skasuj</button>
            </div>
          ))}
        </>
      )}
      <div className={styles.formContainer}>
        <form onSubmit={addNewDate} className={styles.dateContainer}>
          <input type="date" name="startDate" min={currentDate} required></input>
          <input type="date" name="endDate" min={currentDate} required></input>
          <input type="text" name="city" required></input>
          <button type="submit" className={`${styles.returnButton} ${styles.primaryButton}`}>Dodaj</button>
        </form>
      </div>
      <Link to="/profile" className={`${styles.returnButton} ${styles.primaryButton}`}>Wróć</Link>
    </div>
  );
}

export default AddCare;
