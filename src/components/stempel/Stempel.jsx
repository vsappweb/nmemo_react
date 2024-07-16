import React, { useEffect, useRef, useState } from 'react'
import './stempel.css'
import { Add } from "@mui/icons-material"

import axios from 'axios'

export default function Stempel() {
  const API = process.env.REACT_APP_SERVER_API
  let [allStempels, setAllStempels] = useState([]);
  const product = useRef();
  const productName = useRef();
  const stempel = useRef();
  const unit = useRef();


  useEffect(() => {
    const getStempels = async () => {
      try {
        const res = await axios.get(`${API}/stempels/allStempels`);
        setAllStempels(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStempels()
  }, [API]);




  const handleSubmit = async (e) => {
    e.preventDefault()
    const newStempelsToProduct = {
      product: product.current.value,
      productName: productName.current.value,
      stempel: stempel.current.value,
      units: unit.current.value,
      desc: "5",
    }
    try {
      await axios.post(`${API}/stempels`, newStempelsToProduct);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      {JSON.parse(sessionStorage.getItem('product')) === null ? <>
       
      </> :
        <div className="stempelContainer">
          {Object.values(allStempels || {}).filter(stemp => stemp.product === JSON.parse(sessionStorage.getItem('product')))
            .map(stempel => {
              return (
                <div className="stempelContainerItems" key={stempel._id}>
                  {/* <div className="stempelContainerItem">
                    <p className="stempelFormText">Profiel/Product:</p><p>{stempel.product || ''}</p>
                  </div> */}
                  <div className="stempelContainerItem">
                    <p className="stempelFormText">Product name:</p><p> {stempel.productName || ''}</p>
                  </div>
                  <div className="stempelContainerItem">
                    <p className="stempelFormText">Stempel:</p><p> {stempel.stempel || ''}</p>
                  </div>
                  <div className="stempelContainerItem">
                    <p className="stempelFormText">Units:</p><p> {stempel.units || ''}</p>
                  </div>
                  <button className="buttonBtn" type="submit" >edit stempels</button>
                </div>
              )
            })}
            {Object.values(allStempels || {}).filter(stemp => stemp.product === JSON.parse(sessionStorage.getItem('product'))).length === 0 &&
            <>
              <p className="stempelFormTitle">No tools yet</p>
              <form className="stempelForm" onSubmit={handleSubmit} >
              <label className="stempelFormLabel" htmlFor="productNumber">
                <p className="stempelFormText">Profiel/Product:</p>
                <input className="stempelFormInput" type="text" id='productNumber' ref={product} minLength={4} maxLength={5} placeholder="0000" defaultValue={JSON.parse(sessionStorage.getItem('product'))} required />
              </label>
              <label className="stempelFormLabel" htmlFor="productName">
                <p className="stempelFormText">Product name:</p>
                <input className="stempelFormInput" type="text" id='productName' ref={productName} placeholder="0000" defaultValue="product Name" required />
              </label>
              <label className="stempelFormLabel" htmlFor="stempel">
                <p className="stempelFormText">Stempel:</p>
                <input className="stempelFormInput" type="text" id='stempel' ref={stempel} placeholder="0000" defaultValue="stempel" required />
              </label>
              <label className="stempelFormLabel" htmlFor="unit">
                <p className="stempelFormText">Unit:</p><Add />
                <input className="stempelFormInput" type="text" id='unit' ref={unit} placeholder="0000" defaultValue="unit" required />
              </label>
              <div className="stempelFormBtn">
                <button className="buttonBtn" type="submit" >add product tools</button>
              </div>
            </form>
            </>
            }
        </div>
      }
    </>
  )
}
