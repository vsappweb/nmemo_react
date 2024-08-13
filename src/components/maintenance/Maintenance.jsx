import React, { useEffect, useRef, useState } from "react";
import "./maintenance.css";
import { NewReleases } from "@mui/icons-material";
import axios from "axios";

export default function Maintenance() {
  const API = process.env.REACT_APP_SERVER_API;
  let [allActualOrders, setAllActualOrders] = useState([]);
  let [allUsers, setAllUsers] = useState([]);
  const maintenance = useRef();

  useEffect(() => {
    const getUsrsers = async () => {
      try {
        const res = await axios.get(`${API}/users/usersList`);
        setAllUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsrsers();
  }, [API]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${API}/actualOrders/allActualOrders`);
        setAllActualOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [API]);

  return (
    <div className="maintenance">
      <div className="bmGmSortContainer">
        {Object.values(allActualOrders).map((actualOrder) => (
          <div key={actualOrder._id} className="maintenanceOrdersContainer">
            <div className="maintenanceOrdersAlarm">
              <NewReleases />
            </div>
            <div className="maintenanceOrdersData">
              <div className="maintenanceOrdersBox">
                <p className="maintenanceProductText">
                  <span>Wals:</span>
                  {actualOrder.userId}
                </p>
                <p className="maintenanceProductText">
                  <span>Order:</span>
                  {actualOrder.orderNumber}
                </p>
                <p className="maintenanceProductText">
                  <span>Status:</span>
                  {actualOrder.status}
                </p>
                <p className="maintenanceProductText">
                  <span>Start:</span>
                  {actualOrder.dateStart}
                </p>
              </div>
              <div className="maintenanceOrdersBox">
                <p className="maintenanceProductText">
                  <span>Product:</span>
                  {actualOrder.productNumber}
                </p>
                <p className="maintenanceProductText">
                  <span>pos:</span>
                  {actualOrder.posNumber}
                </p>
                <p className="maintenanceProductText">
                  <span>Quantity:</span>
                  {actualOrder.amount}
                  <span>st.</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
