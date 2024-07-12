import React, { useContext, useRef, useState } from 'react'
import './orders.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { AuthContext } from "../../context/AuthContext";

import axios from 'axios';

export default function Orders() {
  const API = process.env.REACT_APP_SERVER_API
  const date = new Date();
  const { user } = useContext(AuthContext);
  const [showPrint, setShowPrint] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [operator, setOperator] = useState('')
  const productnumber = useRef();
  const operatorUser = useRef();




  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("product", JSON.stringify(productnumber.current.value));
    setShowBtn(!showBtn)
  }

  const handleShowPrint = () => {
    setShowPrint(!showPrint)
  }

  const handlePrint = async () => {
    const incompleet = {
      productNumber: JSON.parse(localStorage.getItem('product')),
      lineId: user.personnelnumber,
      operator: operatorUser.current.value,
      date: date.toLocaleDateString('nl-NL')
    }
    try {
      console.log(incompleet)
      window.print();
      await axios.post(`${API}/incompleetAantals`, incompleet);
      window.location.reload();
    } catch (err) {

    }
  }



  return (
    <>
      <div className="ordersTopbar">
        <Topbar />
      </div>
      <div className='orders'>
        <div className="ordersSidebar">
          <Sidebar />
        </div>
        <div className="ordersRight">
          <div className="orderRightProductSubmit">
            <form className="orderRightProductForm" onSubmit={handleSubmit} >
              <label className="orderRightProductFormLabel" htmlFor="productNumber">
                <p className="orderRightProductFormText">Please enter your product:</p>
                <input className="orderRightProductFormInput" type="text" id='productNumber' ref={productnumber} minLength={2} maxLength={4} placeholder="0000" defaultValue={JSON.parse(localStorage.getItem('product'))} required />
              </label>
              <button className="orderRightProductFormBtn ordersButton" type="submit" >Get product</button>
            </form>
          </div>
          {showBtn && <div className="orderRightBtnContainer">
            <button className="ordersButton" type="submit" >Add quality warnings</button>
            <button className="ordersButton" type="submit" onClick={() => handleShowPrint()}>incompleet aantal</button>
            <button className="ordersButton" type="submit" >werkinstruktie</button>
          </div>}
          {showPrint && 
          <div className="orderIncompleetAantal" onSubmit={handlePrint}>
            <h3 className="orderIncompleetAantalTitles">Incompleet aantal</h3>
            <label className="orderRightProductFormLabel" htmlFor="operator">
              <p className="orderRightProductFormText">Operator:</p>
              <input className="orderRightProductFormInput" type="text" id='operator' ref={operatorUser} minLength={4} maxLength={4} placeholder="0000"  onChange={() => setOperator(operatorUser.current.value)} required/>
            </label>
            <div className="incompleetAantalPaperForm">
              <p className="orderIncompleetAantalTitle">melding incomplete aantallen</p>
              <p className="orderIncompleetAantalTitle" style={{ fontSize: '22px', marginLeft: '60px' }}>incompleet<br /> aantal</p>
            <p className="orderIncompleetAantalTitle" style={{ borderBottom: '1px solid black', width: '80%' }}>Datum: {date.toLocaleDateString('nl-NL')} / {user.personnelnumber} / {JSON.parse(localStorage.getItem('product'))} / {operator}</p>
              <div className="ordersFormAanmeldenColontitule" >
                <p className="ordersFormAanmeldenColontituleText">G:\Kwaliteitsdienst\Formulieren\incomplete aantallen .xlsx</p>
                <p className="ordersFormAanmeldenColontituleDate">28-6-2016</p>
              </div>
            </div>
            <button className="ordersButton" type="submit" onClick={() => handlePrint()}>afdruken/print</button>
          </div>
          }


          {/* <div className="ordersProductionsFormulierenAanmelden">
            <form className="ordersFormAanmelden" onSubmit={handleSubmit}>
              <h2 className="ordersFormAanmeldenTitle">Aanmelden vrijgave profiel</h2>
              <br />
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Productnummer:</p>
                <input className="ordersFormAanmeldenInput" type="text" />
              </label>
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Posnummer:</p>
                <input className="ordersFormAanmeldenInput" type="text" />
              </label>
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Werkordernummer:</p>
                <input className="ordersFormAanmeldenInput" type="text" />
              </label>
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Walsnummer:</p>
                <input className="ordersFormAanmeldenInput" type="text" />
              </label>
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Datalyzer aangepast/ notitie</p>
                <input className="ordersFormAanmeldenInput" type="text" />
              </label>
              <br />
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Naam:</p>
                <input className="ordersFormAanmeldenInput" type="text" />
              </label>
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Datum:</p>
                <input className="ordersFormAanmeldenInput" type="text" defaultValue={date.toLocaleDateString('nl-NL')} />
              </label>
              <label className="ordersFormAanmeldenLabel" ><p className="ordersFormAanmeldenLabelTitle">Tijd:</p>
                <input className="ordersFormAanmeldenInput" type="text" defaultValue={date.toLocaleTimeString()} />
              </label>
              <br />
              <div className="ordersFormAanmeldenColontitule" >
                <p className="ordersFormAanmeldenColontituleText">\\datasrv\kam$\Primaire-processen\Productie\Formulieren\Aanmelden profiel vrijgave</p>
                <p className="ordersFormAanmeldenColontituleDate">14-6-2024</p>
              </div>
              <button className="ordersButton" type="submit" onClick={() => { window.print(); }}>afdruken/print</button>
            </form>
          </div> */}

        </div>
      </div>
    </>
  )
}
