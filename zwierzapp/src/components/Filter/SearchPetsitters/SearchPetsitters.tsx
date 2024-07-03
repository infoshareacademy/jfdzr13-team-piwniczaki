import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../context/AuthContext";
import getPetData from "../../../hooks/getPetData";
import styles from "./SearchPetsitters.module.scss";
interface FormField {
  [key: string]: string | number;
}

const SearchPetsitters = () => {
  const { currentUser } = useAuth() || {};
  const petsArr = getPetData(currentUser.uid);

  const currentDate = new Date().toISOString().split("T")[0];
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateString = nextDate.toISOString().split("T")[0];

  const initialFormData: FormField = {
    petId: petsArr.length >= 1 ? petsArr[0].id : "",
    serviceType: "walk",
    city: currentUser.city,
    startDate: currentDate,
    endDate: nextDateString,
    minPrice: 10,
    maxPrice: 200,
  };

  const [formData, setFormData] = useState<FormField>(initialFormData);
  const [searchParams, setSearchParams] = useSearchParams();


  const updateFormDataFromSearchParams = (searchParams, initialFormData) => {
    const queryParameters = new URLSearchParams(searchParams.toString());
    return {
      petId: queryParameters.get("petId") || initialFormData.petId,
      minPrice: queryParameters.get("minPrice") || initialFormData.minPrice,
      maxPrice: queryParameters.get("maxPrice") || initialFormData.maxPrice,
      startDate: queryParameters.get("startDate") || initialFormData.startDate,
      endDate: queryParameters.get("endDate") || initialFormData.endDate,
      city: queryParameters.get("city") || initialFormData.city,
      serviceType: queryParameters.get("serviceType") || initialFormData.serviceType,
    };
  };

  useEffect(() => {
   setFormData(updateFormDataFromSearchParams(searchParams, initialFormData));
   console.log('który burek będzie?',formData)
  }, [searchParams])


  useEffect(() => {
    if (petsArr.length > 0) {
      const newSearchParams = new URLSearchParams();
      Object.keys(formData).forEach((paramName) => {
        if (formData[paramName]) {
          newSearchParams.set(paramName, formData[paramName].toString());
        }
      });
      setSearchParams(newSearchParams);
    }
  }, [formData, petsArr]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if ((name === 'startDate' || name === 'endDate') && name === 'startDate' && formData.endDate < value) {
      setFormData(prevState => ({
        ...prevState,
        startDate: value,
        endDate: value // Ustaw endDate na startDate, jeśli jest wcześniejsze
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);
    let newSearchParams = new URLSearchParams();

    formValues.forEach((paramValue, paramName) => {
      if (paramName === "city" && typeof paramValue === "string") {
        paramValue = paramValue.trim().toLowerCase().replace(/\s+/g, "-");
      }
      newSearchParams.set(paramName, paramValue.toString());
    });
    setSearchParams(newSearchParams);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Wyszukaj opiekuna</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Imię zwierzaka
          <select name="petId" onChange={handleChange}>
            {petsArr.length >= 1 &&
              petsArr.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Rodzaj usługi
          <label>
            <input
              type="radio"
              name="serviceType"
              value="walk"
              onChange={handleChange}
              checked={formData.serviceType === "walk"}
            />{" "}
            Spacer{" "}
          </label>
          <label>
            <input
              type="radio"
              name="serviceType"
              value="accom"
              onChange={handleChange}
              checked={formData.serviceType === "accom"}
            />{" "}
            Nocleg{" "}
          </label>
          <label>
            <input
              type="radio"
              name="serviceType"
              value="homeVisit"
              onChange={handleChange}
              checked={formData.serviceType === "homeVisit"}
            />{" "}
            Wizyta domowa{" "}
          </label>
        </label>

        <label>
          Miasto
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>

        <label>
          Termin
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            min={currentDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            min={formData.startDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Cena
          <label>
            min
            <input
              type="number"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            max
            <input
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                min={formData.minPrice}
                onChange={handleChange}
            />
          </label>
        </label>

        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
};

export default SearchPetsitters;
