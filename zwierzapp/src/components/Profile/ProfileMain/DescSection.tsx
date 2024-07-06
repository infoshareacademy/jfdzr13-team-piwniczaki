import { useState, useRef, useEffect } from "react";
import useAuth from "../../../context/AuthContext";
import { db } from "../../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import styles from "./DescSection.module.scss"
import getUserData from "../../../hooks/getUserData";
import Loading from "../../Loading/Loading";
import toast from 'react-hot-toast';

function DescSection() {
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth() || {};
    const [isEdit, setEdit] = useState(false);
    const longDescriptionRef = useRef(null);

    const userDoc = getUserData(currentUser.uid)
    useEffect(() => {
        if (userDoc ) {
            setLoading(false)
        }
    }, [userDoc])

    const handleChange = async () => {
        if (!isEdit) {
            setEdit(true)
        }
        if (isEdit) {
            const userRef = doc(db, 'Users', userDoc.id);
            const newLongDescription = longDescriptionRef.current.value;
            setEdit(false)
            return toast.promise(updateDoc(userRef, {
                descLong: newLongDescription
            }), {
                loading: "Dodawnie",
                success: <b>Dodano!</b>,
                error: <b>Coś poszło nie tak...</b>,
            });
        }
    };
    if (loading) {
        return <Loading message="Ładowanie profilu" />;
    }
    return (
        <div className={styles.descContainer}>
            {isEdit ? (
                <>
                    <input ref={longDescriptionRef} placeholder={`${userDoc.descLong}`} className={styles.longDescInput} id="longDescription" name="longDescription"></input>
                    <button className={`${styles.editDescButton} ${styles.primaryButton}`} onClick={handleChange}>Zapisz</button>
                </>
            ) : (
                <>
                    <p>{userDoc.descLong}</p>
                    <button className={`${styles.editDescButton} ${styles.primaryButton}`} onClick={handleChange}>Edytuj opis</button>
                </>
            )}
        </div>
    );
}

export default DescSection;