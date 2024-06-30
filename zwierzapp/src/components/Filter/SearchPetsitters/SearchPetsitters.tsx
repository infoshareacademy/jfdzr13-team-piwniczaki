import React, { useEffect, useState } from "react";
import styles from "./SearchPetsitters.module.scss";
import getPetData from "../../../hooks/getPetData";
import useAuth from "../../../context/AuthContext";
import MultiRangeSlider from "multi-range-slider-react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

interface FormField {
  [key: string]: string | number;
}

const initialFormData: FormField[] = [
  { petName: "" },
  { serviceType: "walk" },
  { city: "" },
  { startDate: "" },
  { endDate: "" },
  { minValue: 0 },
  { maxValue: 200 },
];

const SearchPetsitters = () => {
  const [formData, setFormData] = useState<FormField[]>([
    { petName: "" },
    { serviceType: "walk" },
    { city: "" },
    { startDate: "" },
    { endDate: "" },
    { minValue: 0 },
    { maxValue: 200 },
  ]);
  const { currentUser } = useAuth() || {};
  const petsArr = getPetData(currentUser.uid);
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const handlePriceChange = (e: { minValue: number; maxValue: number }) => {
    setFormData({
      ...formData,
      minValue: e.minValue,
      maxValue: e.maxValue,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPetId = e.target.value;
    const selectedPet = petsArr.find((pet) => pet.id === selectedPetId);
  };

  //

  useEffect(() => {
    let searchQuery = "";

    // paramObj -> key: petName, value: ""

    for (let i = 0; i < formData.length; i++) {
      const paramObj = formData[i];

      if (Object.values(paramObj)[0]) {
        // console.log(Object.values(paramObj)[0]);
        if (searchQuery.length === 0) {
          // searchQuery = ""
          searchQuery += `${Object.keys(paramObj)[0]}=${
            Object.values(paramObj)[0]
          }`; // petName=antek
        } else {
          // searchQuery = "petName=antek"
          searchQuery += `&${Object.keys(paramObj)[0]}=${
            Object.values(paramObj)[0]
          }`; // petName=antek&serviceType=walk
        }
      }
    }
    // "" || 0 || undefined -> false
    console.log("before nav", searchQuery);

    if (searchQuery) {
      console.log("while nav", searchQuery);
      navigate(`/search?${searchQuery}`);
    }
  }, [formData]);

  // useEffect(() => {});

  // useEffect(() => {
  //   setSearchQuery(
  //     `${formData.petName}&${formData.serviceType}&${formData.city}&${formData.startDate}&${formData.endDate}&${formData.minValue}&${formData.maxValue}`
  //   );
  //   setSearchParams({ q: searchQuery });
  //   navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  // }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Wyszukaj opiekuna</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Imię zwierzaka
          <select name="petName" onChange={handleChange}>
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
          <MultiRangeSlider
            min={0}
            max={200}
            step={10}
            minValue={formData.minValue}
            maxValue={formData.maxValue}
            onInput={handlePriceChange}
          />
        </label>

        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
};

export default SearchPetsitters;
