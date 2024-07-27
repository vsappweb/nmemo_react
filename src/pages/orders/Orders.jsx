import React, { useContext, useRef, useState, useEffect } from "react";
import "./orders.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import ProductNumberGet from "../../components/productNumberGet/ProductNumberGet";
import { HighlightOff } from "@mui/icons-material";
import Pdf from "../../components/pdf/Pdf";

import axios from "axios";

export default function Orders() {
  const API = process.env.REACT_APP_SERVER_API;
  const date = new Date();
  const { user } = useContext(AuthContext);
  const [showPrint, setShowPrint] = useState(false);
  const [operator, setOperator] = useState("");
  const [incompleet, setIncompleet] = useState([]);
  const operatorUser = useRef();

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/incompleetAantals/allIncompleetAantal`
        );
        if (res && res.data) {
          setIncompleet(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    let result = fetchData();
    if (!result) {
      interval = setInterval(fetchData, 60000);
    }
    interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [API]);

  const handleDeleteIncompleetAntal = async (id) => {
    try {
      await axios.delete(`${API}/incompleetAantals/${id}`);
      window.alert("Deleted");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowPrint = () => {
    setShowPrint(!showPrint);
  };

  const handlePrint = async () => {
    const incompleet = {
      productNumber: JSON.parse(localStorage.getItem("product")),
      lineId: user.personnelnumber,
      operator: operatorUser.current.value,
      hide: "false",
      date: date.toLocaleDateString("nl-NL"),
    };
    try {
      window.print();
      await axios.post(`${API}/incompleetAantals`, incompleet);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <>
      <div className="ordersTopbar">
        <Topbar />
      </div>
      <div className="orders">
        <div className="ordersSidebar">
          <Sidebar />
        </div>
        <div className="ordersRight">
          <div className="orderRightProductSubmit">
            <ProductNumberGet />
          </div>
          {localStorage.getItem("product") && (
            <>
              <Pdf />
              <div className="orderRightBtnContainer">
                <button className="ordersButton" type="submit">
                  Add quality warnings
                </button>
                <button
                  className="ordersButton"
                  type="submit"
                  onClick={() => handleShowPrint()}
                >
                  incompleet aantal
                </button>
                <button className="ordersButton" type="submit">
                  werkinstruktie
                </button>
              </div>
            </>
          )}
          {showPrint && (
            <>
              {user.role === 3 ? (
                <div className="orderIncompleetAantal" onSubmit={handlePrint}>
                  <h3 className="orderIncompleetAantalTitles">
                    Incompleet aantal
                  </h3>
                  <label
                    className="orderRightProductFormLabel"
                    htmlFor="operator"
                  >
                    <p className="orderRightProductFormText">Operator:</p>
                    <input
                      className="orderRightProductFormInput"
                      type="text"
                      id="operator"
                      ref={operatorUser}
                      minLength={4}
                      maxLength={4}
                      placeholder="0000"
                      onChange={() => setOperator(operatorUser.current.value)}
                      required
                    />
                  </label>
                  <div className="incompleetAantalPaperForm">
                    <p className="orderIncompleetAantalTitle firstLine">
                      melding incomplete aantallen
                    </p>
                    <p
                      className="orderIncompleetAantalTitleBig secondLine"
                      style={{
                        fontSize: "44px",
                        fontWeight: "bold",
                        marginLeft: "120px",
                      }}
                    >
                      incompleet
                      <br /> aantal
                    </p>
                    <p
                      className="orderIncompleetAantalTitle thirdLine"
                      style={{ borderBottom: "1px solid black", width: "80%" }}
                    >
                      Datum: {date.toLocaleDateString("nl-NL")} /{" "}
                      {user.personnelnumber} /{" "}
                      {JSON.parse(localStorage.getItem("product"))} / {operator}
                    </p>
                    <div className="ordersFormAanmeldenColontitule">
                      <p className="ordersFormAanmeldenColontituleText">
                        G:\Kwaliteitsdienst\Formulieren\incomplete aantallen
                        .xlsx
                      </p>
                      <p className="ordersFormAanmeldenColontituleDate">
                        28-6-2016
                      </p>
                    </div>
                  </div>
                  <button
                    className="ordersButton"
                    type="submit"
                    onClick={() => handlePrint()}
                  >
                    afdruken/print
                  </button>
                </div>
              ) : (
                <div className="orderIncompleetAantalItems">
                  {Object.values(incompleet).map((incomplete) => (
                    <>
                      <div className="rightbarInfoItems" key={incomplete._id}>
                        <div className="rightbarInfoBoxItem">
                          <span className="rightbarInfoBoxItemKey">
                            Line: {incomplete.lineId}
                          </span>
                          <br />
                          <span className="rightbarInfoBoxItemKey">
                            Product: {incomplete.productNumber}
                          </span>
                        </div>
                        <div
                          className="deleteBtn"
                          onClick={() =>
                            handleDeleteIncompleetAntal(incomplete._id)
                          }
                        >
                          <HighlightOff />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </>
          )}

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
  );
}
