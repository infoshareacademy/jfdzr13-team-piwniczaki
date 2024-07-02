import React, { useEffect, useState } from "react";
import styles from "./SearchPetsitters.module.scss";
import getPetData from "../../../hooks/getPetData";
import useAuth from "../../../context/AuthContext";
import { useSearchParams } from "react-router-dom";
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

  useEffect(() => {
    let initialSearchQuery = "";

    Object.keys(formData).forEach((paramName) => {
      if (formData[paramName]) {
        if (initialSearchQuery) {
          initialSearchQuery += `&${paramName}=${formData[paramName]}`;
        } else {
          initialSearchQuery += `${paramName}=${formData[paramName]}`;
        }
      }
    });

    setSearchParams(initialSearchQuery);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.target as HTMLFormElement);

    let searchQuery = "";

    formValues.entries().forEach(([paramName, paramValue]) => {
      if (paramValue) {
        if (searchQuery) {
          searchQuery += `&${paramName}=${paramValue}`;
        } else {
          searchQuery += `${paramName}=${paramValue}`;
        }
      }
    });

    setSearchParams(new URLSearchParams(searchQuery));
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
            min={currentDate}
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
