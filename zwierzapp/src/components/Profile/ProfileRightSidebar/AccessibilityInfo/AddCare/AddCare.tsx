import styles from "./addCare.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFirebaseData from '../../../../../hooks/useFirebaseData';
import useAuth from "../../../../../context/AuthContext";
import { db } from "../../../../../utils/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import toast from 'react-hot-toast';

function AddCare() {
  const { currentUser } = useAuth() || {};
  const [accessDates, setAccessDates] = useState([]);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const database = useFirebaseData("Petsitters");

  useEffect(() => {
    if (currentUser && database.length > 0) {
      const userEntry = database.find(element => element.userId.includes(currentUser.uid));
      if (userEntry) {
        setAccessDates(userEntry.access || []);
        setDocumentId(userEntry.id);
      }
    }
  }, [database, currentUser]);

  const addNewDate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    if (documentId && startDate && endDate) {
      const newDate = { startDate, endDate };
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

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.addcareContainer}>
      {accessDates.length === 0 ? (
        <p className={styles.emptyState}>Brak dostępnych dat</p>
      ) : (
        accessDates.map((date, index) => (
          <div key={index} className={styles.dateContainer}>
            <input type="date" value={date.startDate} readOnly></input>
            <input type="date" value={date.endDate} readOnly></input>
            <button onClick={() => removeRecord(date)}>Skasuj</button>
          </div>
        ))
      )}
      <div>
        <form onSubmit={addNewDate}>
          <input type="date" name="startDate" min={currentDate} required></input>
          <input type="date" name="endDate" min={currentDate} required></input>
          <button type="submit">Dodaj</button>
        </form>
      </div>
      <Link to="/profile" className={styles.becomePetSitterLink}>Wróć</Link>
    </div>
  );
}

export default AddCare;
