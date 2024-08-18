import React, { useContext, useRef, useState, useEffect } from "react";
import "./productNumberGet.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function ProductNumberGet() {
  const API = process.env.REACT_APP_SERVER_API;
  const productnumber = useRef();
  const posnumber = useRef();
  const ordernumber = useRef();
  const amountnumber = useRef();
  const { user } = useContext(AuthContext);
  let [allActualOrders, setAllActualOrders] = useState([]);
  const date = new Date();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${API}/actualOrders/allActualOrders`);
        setAllActualOrders(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [API]);

  const sortByDate = (a, b) => {
    return new Date(b.dateStart) - new Date(a.dateStart);
  };

  const sortedActualOrders = Object.values(allActualOrders).sort(sortByDate);
  allActualOrders = Object.values(sortedActualOrders).filter(
    (actualOrder) =>
      actualOrder.show === true && actualOrder.userId === user._id
  );
  const actualOrderIds = Object.values(allActualOrders).map(
    (actualOrder) => actualOrder._id
  );

  console.log(Object.values(actualOrderIds));

  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem(
    //   "product",
    //   JSON.stringify(productnumber.current.value)
    // );
    const actualProduct = {
      productNumber: productnumber.current.value,
      userId: user._id,
      dateStart: date.toLocaleDateString("nl-NL"),
      status: "in progress",
      posNumber: posnumber.current.value,
    };
    try {
      axios.post(`${API}/actualOrders`, actualProduct);
      window.alert(`Added product number: ${productnumber.current.value}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddActualOrder = (e) => {
    e.preventDefault();
    // localStorage.setItem("order", true);
    const actualOrder = {
      orderNumber: ordernumber.current.value,
      amount: amountnumber.current.value,
      orderAdded: true,
    };
    try {
      // console.log("start >>>");
      // console.log(actualOrderIds);
      // console.log(actualOrder);
      axios.put(`${API}/actualOrders/${actualOrderIds}`, actualOrder);
      window.alert(`Added order number: ${ordernumber.current.value}, amount: ${amountnumber.current.value}`);
      // console.log("end <<<");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    // localStorage.removeItem("product");
    // localStorage.removeItem("order");
    const actualProduct = {
      dateEnd: date.toLocaleDateString("nl-NL"),
      status: "finished",
      show: false,
      orderAdded: false,
    };
    try {
      // console.log("start >>>");
      // console.log(actualOrderIds);
      axios.put(`${API}/actualOrders/${actualOrderIds}`, actualProduct);
      window.alert(`Closed and removed product and order`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("test >>>", allActualOrders);
  const actualProductForLine = Object.values(allActualOrders).filter((actualOrder) => {
    return actualOrder.userId === user._id && actualOrder.show === true;
  })

  const actualOrderForLine = Object.values(allActualOrders).filter((actualOrder) => {
    return actualOrder.userId === user._id && actualOrder.orderAdded === true;
  })
  console.log('Actual product for line >>>', Object.values(actualProductForLine))
  console.log('Actual order for line >>>', Object.values(actualOrderForLine))


  return (
    <>
      {actualProductForLine.length === 0 ? (
        <form
          className="orderRightProductForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <label className="orderRightProductFormLabel" htmlFor="productNumber">
            <p className="orderRightProductFormText">
              Please enter your product:
            </p>
            <input
              className="orderRightProductFormInput"
              type="text"
              id="productNumber"
              ref={productnumber}
              minLength={2}
              maxLength={7}
              placeholder="_________"
              defaultValue={JSON.parse(localStorage.getItem("product"))}
              required
            />
            <input
              className="orderRightProductFormInput"
              type="text"
              id="posNumber"
              ref={posnumber}
              minLength={2}
              maxLength={7}
              placeholder="POS"
              defaultValue=""
              required
            />
          </label>
          <button
            className="orderRightProductFormBtn ordersButton"
            type="submit"
          >
            Get product
          </button>
        </form>
      ) : (
        <div className="productOrdersContainer">
          <form
            className="orderRightProductForm"
            autoComplete="off"
            onSubmit={handleChange}
          >
            {/* <p className="orderRightProductFormText">
              {JSON.parse(localStorage.getItem("product"))}
            </p> */}
            {Object.values(allActualOrders).map((actualOrder) => (
                <div
                  key={actualOrder._id}
                  // className="orderRightProductContainer"
                >
                  <p
                    className="orderRightProductFormText"
                  >
                    {actualOrder.productNumber}
                  </p>
                  </div>
            ))}
            <button
              className="orderRightProductFormBtn ordersButton"
              type="submit"
            >
              Change
            </button>
          </form>
          <br />
          <br />

          {actualOrderForLine.length === 0 ? (
            <div className="orderRightProductContainer">
              <form
                className="orderRightProductForm"
                autoComplete="off"
                onSubmit={handleAddActualOrder}
              >
                <label
                  className="orderRightOrderFormLabel"
                  htmlFor="orderNumber"
                >
                  <p className="orderRightProductFormText">Order:</p>
                  <input
                    className="orderRightProductFormInput"
                    type="text"
                    id="orderNumber"
                    ref={ordernumber}
                    minLength={2}
                    maxLength={7}
                    placeholder="_________"
                    defaultValue=""
                    required
                  />
                </label>
                <label
                  className="orderRightOrderFormLabel"
                  htmlFor="amountNumber"
                >
                  <p className="orderRightProductFormText">Amount:</p>
                  <input
                    className="orderRightProductFormInput"
                    type="text"
                    id="amountNumber"
                    ref={amountnumber}
                    minLength={2}
                    maxLength={9}
                    placeholder="_________"
                    defaultValue=""
                    required
                  />
                </label>
                <button
                  className="orderRightProductFormBtn ordersButton"
                  type="submit"
                >
                  add Order
                </button>
              </form>
            </div>
          ) : (
            <div>
              {Object.values(allActualOrders).map((actualOrder) => (
                <div
                  key={actualOrder._id}
                  className="orderRightProductContainer"
                >
                  <p
                    className="orderRightProductText"
                    style={{ textAlign: "center" }}
                  >
                    <span>Order:</span>
                    {actualOrder.orderNumber}
                  </p>
                  <div className="orderRightProductTextContainer">
                    <p className="orderRightProductText">
                      <span>Product:</span>
                      {actualOrder.productNumber}
                    </p>
                    <p className="orderRightProductText">
                      <span>pos:</span>
                      {actualOrder.posNumber}
                    </p>
                  </div>
                  <p className="orderRightProductText">
                    <span>Quantity:</span>
                    {actualOrder.amount}
                    <span>st.</span>
                  </p>
                  <p className="orderRightProductText">
                    <span>Status:</span>
                    {actualOrder.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
