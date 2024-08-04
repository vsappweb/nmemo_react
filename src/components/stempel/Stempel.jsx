import React, { useEffect, useRef, useState } from "react";
import "./stempel.css";
import { Add, Edit, Remove, HighlightOff } from "@mui/icons-material";

import axios from "axios";

export default function Stempel() {
  const API = process.env.REACT_APP_SERVER_API;
  const date = new Date();
  let [allStempels, setAllStempels] = useState([]);
  const product = useRef();
  const productName = useRef();
  const stempel = useRef();
  const [showEditStempel, setShowEditStempel] = useState(false);
  const [showStempel, setshowStempel] = useState(true);
  const [delBtn, setdelBtn] = useState(false);

  // add unit https://sadam-bapunawar.medium.com/add-and-remove-form-fields-dynamically-using-react-and-react-hooks-3b033c3c0bf5
  const [unitValues, setUnitValues] = useState([{ unit: "" }]);

  let handleChangeUnit = (i, e) => {
    console.log("index >>>", i);
    console.log("event >>>", e);
    let newUnitValues = [...unitValues];
    console.log("Unit values >>>", newUnitValues);
    newUnitValues[i][e.target.name] = e.target.value;
    console.log("Unit values after >>>", newUnitValues);
    setUnitValues(newUnitValues);
    console.log("Unit values after set >>>", unitValues);
  };

  let addUnitFields = () => {
    setUnitValues([...unitValues, { unit: "" }]);
  };

  let removeUnitFields = (i) => {
    let newUnitValues = [...unitValues];
    newUnitValues.splice(i, 1);
    setUnitValues(newUnitValues);
  };
  const [formValues, setFormValues] = useState([
    { productName: "", stempel: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { productName: "", stempel: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  //add unit https://sadam-bapunawar.medium.com/add-and-remove-form-fields-dynamically-using-react-and-react-hooks-3b033c3c0bf5

  useEffect(() => {
    const getStempels = async () => {
      try {
        const res = await axios.get(`${API}/stempels/allStempels`);
        setAllStempels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStempels();
  }, [API]);

  const handleEdit = async (id) => {
    const newStempelsToProduct = {
      // product: product.current.value,
      // productName: productName.current.value,
      // stempel: stempel.current.value,
      productNameAndStempel: formValues,
      units: unitValues, //JSON.stringify(formValues), //units: unit.current.value,
      desc: "updeted stempel date " + date.toLocaleDateString("nl-NL"),
    };
    try {
      console.log(newStempelsToProduct);
      console.log(id);
      // await axios.put(`${API}/stempels/${id}`, newStempelsToProduct);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const showEditStempels = () => {
    setShowEditStempel(!showEditStempel);
    setshowStempel(!showStempel);
    setdelBtn(false);
  };

  const handleChangeBtn = () => {
    setdelBtn(!delBtn);
    setShowEditStempel(false);
    setshowStempel(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/stempels/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStempelsToProduct = {
      product: product.current.value,
      productName: productName.current.value,
      stempel: stempel.current.value,
      productNameAndStempel: formValues,
      units: unitValues, //JSON.stringify(formValues), //units: unit.current.value,
      desc: "5",
    };
    try {
      await axios.post(`${API}/stempels`, newStempelsToProduct);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {JSON.parse(localStorage.getItem("product")) === null ? (
        <></>
      ) : (
        <div className="stempelContainer">
          {allStempels &&
            Object.values(allStempels)
              .filter(
                (stemp) =>
                  stemp.product === JSON.parse(localStorage.getItem("product"))
              )
              .map((stempel, i) => {
                if (!stempel) return null;
                return (
                  <>
                    <div className="stempelContainerItems" key={i}>
                      <fieldset className="stempelFormType">
                        <legend className="editProfileBorderTitle">
                          Names of product and stempels:
                        </legend>
                        {stempel.productNameAndStempel &&
                          Object.values(stempel.productNameAndStempel).map(
                            (nameAndStempel, index) => {
                              return (
                                <>
                                  <div
                                    className="stempelContainerItem"
                                    key={index}
                                  >
                                    <p className="stempelFormText">
                                      Product Name {index + 1}:
                                    </p>
                                    {showStempel && (
                                      <p>{nameAndStempel.productName || ""}</p>
                                    )}
                                    {showEditStempel && nameAndStempel && (
                                      <input
                                        className="stempelFormInput"
                                        name="productName"
                                        type="text"
                                        id="productName"
                                        ref={productName}
                                        placeholder={`Product name ${
                                          index + 1
                                        }`}
                                        defaultValue={
                                          nameAndStempel.productName || ""
                                        }
                                        onChange={(e) => handleChange(index, e)}
                                      />
                                    )}
                                  </div>
                                  <div className="stempelContainerItem">
                                    <p className="stempelFormText">
                                      Stempel {index + 1}:
                                    </p>
                                    {showStempel && (
                                      <p style={{ color: "blue" }}>
                                        {nameAndStempel.stempel || ""}
                                      </p>
                                    )}
                                    {showEditStempel && nameAndStempel && (
                                      <input
                                        className="stempelFormInput"
                                        name="stempel"
                                        type="text"
                                        id="stempel"
                                        ref={stempel}
                                        placeholder={`Stempel ${index + 1}`}
                                        defaultValue={
                                          nameAndStempel.stempel || ""
                                        }
                                        onChange={(e) => handleChange(index, e)}
                                      />
                                    )}
                                  </div>
                                </>
                              );
                            }
                          )}
                      </fieldset>
                      <fieldset className="stempelFormType">
                        <legend className="editProfileBorderTitle">
                          Units:
                        </legend>
                        {stempel.units &&
                          Object.values(stempel.units).map((unit, index) => {
                            return (
                              <>
                                <div
                                  className="stempelContainerItem"
                                  key={index}
                                >
                                  <p className="stempelFormText">
                                    Unit {index + 1}:
                                  </p>
                                  {showStempel && <p>{unit.unit || ""}</p>}
                                  {showEditStempel && unit && (
                                    <input
                                      type="text"
                                      name={`Unit`}
                                      placeholder={`Unit ${index + 1}`}
                                      defaultValue={unit.unit || ""}
                                      onChange={(e) =>
                                        handleChangeUnit(index, {
                                          e: unit.unit,
                                        })
                                      }
                                    />
                                  )}
                                </div>
                              </>
                            );
                          })}
                      </fieldset>
                    </div>
                    <div className="stempelFormBtn">
                      {/* <div
                        className="editBtn"
                        onClick={() => showEditStempels()}
                      >
                        <Edit />
                      </div> */}
                      {showEditStempel && stempel && (
                        <button
                          className="buttonBtn"
                          type="submit"
                          onClick={() => handleEdit(stempel._id)}
                        >
                          Edit
                        </button>
                      )}
                      {delBtn && stempel && (
                        <button
                          className="buttonBtn"
                          type="submit"
                          onClick={() => handleDelete(stempel._id)}
                        >
                          Delete
                        </button>
                      )}
                      <div
                        className="deleteBtn"
                        onClick={() => handleChangeBtn()}
                      >
                        <HighlightOff />
                      </div>
                    </div>
                  </>
                );
              })}
          {Object.values(allStempels || {}).filter(
            (stemp) =>
              stemp.product === JSON.parse(localStorage.getItem("product"))
          ).length === 0 && (
            <>
              <p className="stempelFormTitle">No tools yet</p>
              <form className="stempelForm" autoComplete="off" onSubmit={handleSubmit}>
                <label className="stempelFormLabel" htmlFor="productNumber">
                  <p className="stempelFormText">Profiel/Product:</p>
                  <input
                    className="stempelFormInput"
                    type="text"
                    id="productNumber"
                    ref={product}
                    minLength={4}
                    maxLength={5}
                    placeholder="0000"
                    defaultValue={JSON.parse(localStorage.getItem("product"))}
                    required
                  />
                </label>
                {formValues.map((element, index) => (
                  <div className="form-inline" key={index}>
                    <fieldset className="stempelFormType">
                      <legend className="stempelFormTypeTitle">
                        Names of product and stempels:
                        {index ? (
                          <div
                            className="deleteBtn"
                            onClick={() => removeFormFields(index)}
                          >
                            <Remove />
                          </div>
                        ) : (
                          <div
                            className="editBtn"
                            onClick={() => addFormFields()}
                          >
                            <Add />
                          </div>
                        )}
                      </legend>

                      <label className="stempelFormLabel" htmlFor="productName">
                        <p className="stempelFormText">Product name:</p>
                        <input
                          className="stempelFormInput"
                          name="productName"
                          type="text"
                          id="productName"
                          ref={productName}
                          placeholder={`Product name ${index + 1}`}
                          defaultValue={element.productName || ""}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </label>
                      <label className="stempelFormLabel" htmlFor="stempel">
                        <p className="stempelFormText">Stempel:</p>
                        <input
                          className="stempelFormInput"
                          name="stempel"
                          type="text"
                          id="stempel"
                          ref={stempel}
                          placeholder={`Stempel ${index + 1}`}
                          defaultValue={element.stempel || ""}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </label>
                    </fieldset>
                  </div>
                ))}
                <fieldset className="stempelFormType">
                  <legend className="stempelFormTypeTitle">Units:</legend>
                  {unitValues.map((element, index) => (
                    <div className="form-inline" key={index}>
                      <label className="stempelFormLabel" htmlFor="unit">
                        <p className="stempelFormText">Unit {index + 1}:</p>
                        {index ? (
                          <div
                            className="deleteBtn"
                            onClick={() => removeUnitFields(index)}
                          >
                            <Remove />
                          </div>
                        ) : (
                          <div
                            className="editBtn"
                            onClick={() => addUnitFields()}
                          >
                            <Add />
                          </div>
                        )}
                        <input
                          type="text"
                          name="unit"
                          placeholder={`Unit ${index + 1}`}
                          defaultValue={element.unit || ""}
                          onChange={(e) => handleChangeUnit(index, e)}
                        />
                      </label>
                    </div>
                  ))}
                </fieldset>
                <div className="stempelFormBtn">
                  <button className="buttonBtn" type="submit">
                    add product tools
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
