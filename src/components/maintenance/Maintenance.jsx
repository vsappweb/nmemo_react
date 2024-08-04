import React, { useEffect, useRef, useState } from "react";
import "./maintenance.css";
import axios from "axios";

export default function Maintenance() {
  const maintenance = useRef();
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [addAmount, setAddAmount] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMaintenance = {
      maintenance: addAmount,
    };
    try {
      await axios
        .post("/api/maintenance", newMaintenance)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="maintenance">
      <div className="bmGmSortContainer">
        <p className="maintenanceText">{addAmount}</p>
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e)} className="maintenanceForm">
          <label htmlFor="maintenance">
            <h5 className="maintenanceDescription">
              Add Amount actual order for product number{" "}
              {JSON.parse(localStorage.getItem("product"))}
            </h5>
            <input
              className="maintenanceInput"
              type="text"
              id="maintenance"
              placeholder="Maintenance"
              ref={maintenance}
            />
          </label>
          <button className="ordersButton" onClick={() => setAddAmount(addAmount + maintenance.current.value)}>Add Amount</button>
          <button
            className="ordersButton"
            type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
