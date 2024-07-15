import React, { useRef } from 'react'
import './productNumberGet.css'

export default function ProductNumberGet() {

  const productnumber = useRef();

  const handleSubmit = (e) => {
    e.preventDefault()
    sessionStorage.setItem('product', JSON.stringify(productnumber.current.value));
    window.location.reload();
  }

  const handleChange = (e) => {
    e.preventDefault()
    sessionStorage.removeItem('product');
    window.location.reload();
  }

  return (
    <>
      {(sessionStorage.getItem('product') === null) ? 
      <form className="orderRightProductForm" autoComplete="off" onSubmit={handleSubmit} >
        <label className="orderRightProductFormLabel" htmlFor="productNumber">
          <p className="orderRightProductFormText">Please enter your product:</p>
          <input className="orderRightProductFormInput" type="text" id='productNumber' ref={productnumber} minLength={2} maxLength={7} placeholder="0000000" defaultValue={JSON.parse(sessionStorage.getItem('product'))} required />
        </label>
        <button className="orderRightProductFormBtn ordersButton" type="submit" >Get product</button>
      </form>:
      <form className="orderRightProductForm" autoComplete="off" onSubmit={handleChange} >
          <p className="orderRightProductFormText">{JSON.parse(sessionStorage.getItem('product'))}</p>
        <button className="orderRightProductFormBtn ordersButton" type="submit" >Change product</button>
      </form>}
    </>
  )
}
