import styles from "./AddPetsitter.module.scss";
import { useState, useEffect } from "react";
import useAuth from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useData from "../../context/DataContext";

function AddPetsitter() {
  const dataContext = useData();
  const authContext = useAuth();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialCheckboxes = {
    cat: false,
    catActivity0: false,
    catActivity1: false,
    catActivity2: false,
    catWeight0: false,
    catWeight1: false,
    catWeight2: false,
    catWeight3: false,
    catWeight4: false,
    catWalk: false,
    catAccom: false,
    catHomeVisit: false,
    dog: false,
    dogActivity0: false,
    dogActivity1: false,
    dogActivity2: false,
    dogWeight0: false,
    dogWeight1: false,
    dogWeight2: false,
    dogWeight3: false,
    dogWeight4: false,
    dogWeight5: false,
    dogWalk: false,
    dogAccom: false,
    dogHomeVisit: false,
  };

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const initialPrices = {
    catWalkPrice: 0,
    catAccomPrice: 0,
    catHomeVisitPrice: 0,
    dogWalkPrice: 0,
    dogAccomPrice: 0,
    dogHomeVisitPrice: 0,
  };

  const [prices, setPrices] = useState(initialPrices);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dataContext && authContext && authContext.currentUser) {
        const { getUserFromDatabase } = dataContext;
        const { currentUser } = authContext;
        const uid = currentUser.uid;
        const userData = await getUserFromDatabase("Petsitters", uid);

        if (userData) {
          setCheckboxes(userData.checkboxes || initialCheckboxes);
          setPrices(userData.prices || initialPrices);
          setIsEditMode(false);
          setIsFirstTime(false);
        } else {
          console.error("Nie zostałeś jeszcze petsitterem");
          setIsFirstTime(true);
          setIsEditMode(true);
        }
      } else {
        console.error("Wystąpił błąd");
      }
    };
    fetchData();
  }, [dataContext, authContext]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPrices((prev) => ({
      ...prev,
      [name]: value ? parseInt(value) : 0,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loadingToastId = toast.loading("Dodawanie danych...");

    if (!checkboxes.dog && !checkboxes.cat) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jedną opcję", { id: "race" });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogActivity0 ||
          checkboxes.dogActivity1 ||
          checkboxes.dogActivity2
        )) ||
      (checkboxes.cat &&
        !(
          checkboxes.catActivity0 ||
          checkboxes.catActivity1 ||
          checkboxes.catActivity2
        ))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jeden rodzaj aktywności fizycznej", {
        id: "activity",
      });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogWeight0 ||
          checkboxes.dogWeight1 ||
          checkboxes.dogWeight2 ||
          checkboxes.dogWeight3 ||
          checkboxes.dogWeight4 ||
          checkboxes.dogWeight5
        )) ||
      (checkboxes.cat &&
        !(
          checkboxes.catWeight0 ||
          checkboxes.catWeight1 ||
          checkboxes.catWeight2 ||
          checkboxes.catWeight3 ||
          checkboxes.catWeight4
        ))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jeden zakres wagi", { id: "weight" });
      return;
    }
    if (
      (checkboxes.dog &&
        !(
          checkboxes.dogHomeVisit ||
          checkboxes.dogWalk ||
          checkboxes.dogAccom
        )) ||
      (checkboxes.cat &&
        !(checkboxes.catHomeVisit || checkboxes.catWalk || checkboxes.catAccom))
    ) {
      toast.dismiss(loadingToastId);
      toast.error("Zaznacz przynajmniej jedną usługę", { id: "offer" });
      return;
    }

    try {
      if (dataContext && authContext && authContext.currentUser) {
        const { currentUser } = authContext;
        const { updateUserToDatabase } = dataContext;
        const uid = currentUser.uid;

        if (isFirstTime) {
          await addDoc(collection(db, "Petsitters"), {
            prices: prices,
            checkboxes: checkboxes,
            userId: currentUser.uid,
          });
          toast.success("Przesłano dane", { id: loadingToastId });
          setIsFirstTime(false);
        } else {
          await updateUserToDatabase("Petsitters", uid, { prices, checkboxes });
          toast.success("Zaktualizowano dane", { id: loadingToastId });
          setIsEditMode(false);
        }

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Błąd podczas zapisywania danych");
    }
  };

  return (
    <div className={styles.AddPetsitterPage}>
      <article className={styles.addPetsitterContainer}>
        <h1>Zostań petsitterem!</h1>
        <h2>Jakimi zwierzętami chcesz się opiekować?</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <div className={styles.dog}>
              <div className="dogRace">
                <label>
                  <input
                    name="dog"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkboxes.dog}
                    disabled={!isEditMode}
                  />
                  PIES
                </label>
              </div>
              {checkboxes.dog && (
                <>
                  <div className="dogActivity">
                    <h3>Aktywność Fizyczna</h3>
                    <div className={styles.dog}>
                      <label>
                        <input
                          name="dogActivity0"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogActivity0}
                          disabled={!isEditMode}
                        />
                        LENIUCH
                      </label>
                      <label>
                        <input
                          name="dogActivity1"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogActivity1}
                          disabled={!isEditMode}
                        />
                        ŚREDNIAK
                      </label>
                      <label>
                        <input
                          name="dogActivity2"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogActivity2}
                          disabled={!isEditMode}
                        />
                        WARIAT
                      </label>
                    </div>
                  </div>
                  <div className="dogWeight">
                    <h3>WAGA</h3>
                    <div>
                      <label>
                        <input
                          name="dogWeight0"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogWeight0}
                          disabled={!isEditMode}
                        />
                        &lt;5kg
                      </label>
                      <label>
                        <input
                          name="dogWeight1"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogWeight1}
                          disabled={!isEditMode}
                        />
                        5-10kg
                      </label>
                      <label>
                        <input
                          name="dogWeight2"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogWeight2}
                          disabled={!isEditMode}
                        />
                        10-15kg
                      </label>
                      <label>
                        <input
                          name="dogWeight3"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogWeight3}
                          disabled={!isEditMode}
                        />
                        15-20kg
                      </label>
                      <label>
                        <input
                          name="dogWeight4"
                          type="checkbox"
                          onChange={handleCheckboxChange}
                          checked={checkboxes.dogWeight4}
                          disabled={!isEditMode}
                        />
                        20+kg
                      </label>
                    </div>
                  </div>
                  <div className="dogOffer">
                    <h3>OFERTA </h3>
                    <label>
                      <input
                        type="checkbox"
                        name="dogWalk"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogWalk}
                        disabled={!isEditMode}
                      />
                      SPACER
                    </label>
                    {checkboxes.dogWalk && (
                      <label>
                        <input
                          type="number"
                          name="dogWalkPrice"
                          value={prices.dogWalkPrice}
                          min={0}
                          onChange={handlePriceInput}
                        />
                        <span>PLN</span>
                      </label>
                    )}

                    <label>
                      <input
                        type="checkbox"
                        name="dogAccom"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogAccom}
                        disabled={!isEditMode}
                      />
                      NOCLEG
                    </label>
                    {checkboxes.dogAccom && (
                      <label>
                        <input
                          type="number"
                          name="dogAccomPrice"
                          value={prices.dogAccomPrice}
                          min={0}
                          onChange={handlePriceInput}
                        />
                        <span>PLN</span>
                      </label>
                    )}

                    <label>
                      <input
                        type="checkbox"
                        name="dogHomeVisit"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.dogHomeVisit}
                        disabled={!isEditMode}
                      />
                      WIZYTA DOMOWA
                    </label>
                    {checkboxes.dogHomeVisit && (
                      <label>
                        <input
                          type="number"
                          name="dogHomeVisitPrice"
                          value={prices.dogHomeVisitPrice}
                          min={0}
                          onChange={handlePriceInput}
                        />
                        <span>PLN</span>
                      </label>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className={styles.cat}>
              <div className="catRace">
                <label>
                  <input
                    name="cat"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkboxes.cat}
                    disabled={!isEditMode}
                  />
                  KOT
                </label>
              </div>
              {checkboxes.cat && (
                <>
                  <div className="catActivity">
                    <h3>AKTYWNOŚĆ FIZYCZNA</h3>
                    <label>
                      <input
                        name="catActivity0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catActivity0}
                        disabled={!isEditMode}
                      />
                      LENIUCH
                    </label>
                    <label>
                      <input
                        name="catActivity1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catActivity1}
                        disabled={!isEditMode}
                      />
                      ŚREDNIAK
                    </label>
                    <label>
                      <input
                        name="catActivity2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catActivity2}
                        disabled={!isEditMode}
                      />
                      WARIAT
                    </label>
                  </div>
                  <div className="catWeight">
                    <h3>WAGA</h3>
                    <label>
                      <input
                        name="catWeight0"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight0}
                        disabled={!isEditMode}
                      />
                      &lt;2kg
                    </label>
                    <label>
                      <input
                        name="catWeight1"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight1}
                        disabled={!isEditMode}
                      />
                      2-4kg
                    </label>
                    <label>
                      <input
                        name="catWeight2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight2}
                        disabled={!isEditMode}
                      />
                      4-6kg
                    </label>
                    <label>
                      <input
                        name="catWeight3"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight3}
                        disabled={!isEditMode}
                      />
                      6-8kg
                    </label>
                    <label>
                      <input
                        name="catWeight4"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWeight4}
                        disabled={!isEditMode}
                      />
                      8+kg
                    </label>
                  </div>
                  <div className="catOffer">
                    <h3>OFERTA </h3>
                    <label>
                      <input
                        type="checkbox"
                        name="catWalk"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catWalk}
                        disabled={!isEditMode}
                      />
                      SPACER
                    </label>
                    {checkboxes.catWalk && (
                      <label>
                        <input
                          type="number"
                          name="catWalkPrice"
                          value={prices.catWalkPrice}
                          min={0}
                          onChange={handlePriceInput}
                        />
                        <span>PLN</span>
                      </label>
                    )}
                    <label>
                      <input
                        type="checkbox"
                        name="catAccom"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catAccom}
                        disabled={!isEditMode}
                      />
                      NOCLEG
                    </label>
                    {checkboxes.catAccom && (
                      <label>
                        <input
                          type="number"
                          name="catAccomPrice"
                          value={prices.catAccomPrice}
                          min={0}
                          onChange={handlePriceInput}
                        />
                        <span>PLN</span>
                      </label>
                    )}
                    <label>
                      <input
                        type="checkbox"
                        name="catHomeVisit"
                        onChange={handleCheckboxChange}
                        checked={checkboxes.catHomeVisit}
                        disabled={!isEditMode}
                      />
                      WIZYTA DOMOWA
                    </label>
                    {checkboxes.catHomeVisit && (
                      <label>
                        <input
                          type="number"
                          name="catHomeVisitPrice"
                          value={prices.catHomeVisitPrice}
                          min={0}
                          onChange={handlePriceInput}
                        />
                        <span>PLN</span>
                      </label>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            {!isFirstTime && !isEditMode && (
              <button type="button" onClick={handleEditClick}>
                Edytuj
              </button>
            )}

            <button type="submit">Zapisz</button>
          </div>
        </form>
      </article>
    </div>
  );
}

export default AddPetsitter;
