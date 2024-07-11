import React from 'react'
import './orders.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

export default function Orders() {
  const date = new Date();

  


  const handleSubmit = (event) => {
    event.preventDefault()

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
              <input className="orderRightProductFormInput" type="text" id='productNumber' minLength={2} maxLength={4} placeholder="0000"/>
            </label>
            <button className="orderRightProductFormBtn ordersButton" type="submit" >Get product</button>
            </form>
          </div>
          <div className="orderRightBtnContainer">
            <button className="ordersButton" type="submit" onClick={() => { window.open('https://orig.in.net', '_blank', 'width=500,height=500,resizable=yes'); }}>Add quality warnings</button>
            <button className="ordersButton" type="submit" onClick={() => { window.print(); }}>incompleet aantal</button>
            <button className="ordersButton" type="submit" onClick={() => { window.print(); }}>werkinstruktie</button>
          </div>


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
