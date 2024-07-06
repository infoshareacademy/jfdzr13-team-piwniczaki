import { useState, useRef, useEffect } from "react";
import useAuth from "../../../context/AuthContext";
import { db } from "../../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import styles from "./DescSection.module.scss";
import getUserData from "../../../hooks/getUserData";
import Loading from "../../Loading/Loading";
import toast from 'react-hot-toast';

function DescSection() {
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth() || {};
    const [isEdit, setEdit] = useState(false);
    const [longDescription, setLongDescription] = useState("");
    const userData = getUserData(currentUser.uid); // Call the custom hook at the top level
    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        if (userData) {
            setUserDoc(userData);
            setLongDescription(userData.descLong || "");
            setLoading(false);
        }
    }, [userData]);

    const handleChange = async () => {
        if (isEdit) {
            const userRef = doc(db, 'Users', userDoc.id);
            setEdit(false);
            return toast.promise(updateDoc(userRef, {
                descLong: longDescription
            }), {
                loading: "Dodawanie",
                success: <b>Dodano!</b>,
                error: <b>Coś poszło nie tak...</b>,
            }).then(() => {
                setUserDoc(prev => ({ ...prev, descLong: longDescription }));
            });
        } else {
            setEdit(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChange();
        }
    };

    if (loading) {
        return <Loading message="Ładowanie profilu" />;
    }

    return (
        <div className={styles.descContainer}>
            {isEdit ? (
                <>
                    <textarea
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Dodaj opis"
                        className={styles.longDescInput}
                        id="longDescription"
                        name="longDescription"
                        rows="4"
                        maxLength={500}
                    />
                    <button className={`${styles.editDescButton} ${styles.primaryButton}`} onClick={handleChange}>Zapisz</button>
                </>
            ) : (
                <>
                    {userDoc.descLong ? (
                        <>
                            <p>{userDoc.descLong}</p>
                            <button className={`${styles.editDescButton} ${styles.primaryButton}`} onClick={handleChange}>Edytuj opis</button>
                        </>
                    ) : (
                        <button className={`${styles.editDescButton} ${styles.primaryButton}`} onClick={handleChange}>Dodaj opis</button>
                    )}
                </>
            )}
        </div>
    );
}

export default DescSection;
