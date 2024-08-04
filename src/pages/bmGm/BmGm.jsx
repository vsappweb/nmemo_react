import React, { useEffect, useRef, useState } from "react";
import "./bmGm.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import GmToolsForm from "../../components/gmToolsForm/GmToolsForm";
import PostGmTools from "../../components/postGmTools/PostGmTools";
import ProductNumberGet from "../../components/productNumberGet/ProductNumberGet";
import Stempel from "../../components/stempel/Stempel";
import Maintenance from "../../components/maintenance/Maintenance";
import { ExpandCircleDownOutlined } from "@mui/icons-material";

import axios from "axios";

export default function BmGm() {
  let [allGmTool, setAllGmTool] = useState([]);
  const API = process.env.REACT_APP_SERVER_API;
  const [showForm, setShowForm] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showProductForm, setShowProductForm] = useState(
    JSON.parse(localStorage.getItem("setProduct"))
      ? JSON.parse(localStorage.getItem("setProduct"))
      : false
  );
  const [showSort, setShowSort] = useState(false);
  const [noYetTools, setNoYetTools] = useState(false);
  const [expandMore, setExpandMore] = useState(5);

  const tools = [];

  const sortValue = useRef();

  useEffect(() => {
    const getGmTools = async () => {
      try {
        const res = await axios.get(`${API}/gmTools/allGmTool`);
        setAllGmTool(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGmTools();
  }, [API]);

  const fetchData = async () => {
    try {
      try {
        const res = await axios.get(`${API}/gmTools/allGmTool`);
        if (!res || !res.data) {
          throw new Error("Invalid response from server");
        }
        Object.values(res.data).forEach((tool) => {
          if (tool && tool.toolNumber) {
            console.log("toolNumber >>>", tool.toolNumber);
            console.log("tool >>>", tool);
            tools.push(tool.toolNumber);
          }
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();

  const getTool = (letter, tools) => {
    return tools.filter((tool) => {
      const regex = new RegExp(letter, "gi");
      return tool.match(regex);
    });
  };

  const showMyTool = () => {
    const outTools = getTool(sortValue.current.value, tools);
    if (outTools.length === 0) {
      setNoYetTools(true);
      document.querySelector(".bmGmSortTool").style.display = "none";
    } else {
      setNoYetTools(false);
      document.querySelector(".bmGmSortTool").style.display = "block";
    }
    const bmGmSortTool = document.querySelector(".bmGmSortTool");

    const view = Object.values(outTools)
      .map((tool, index) => {
        const regex = new RegExp(sortValue.current.value, "gi");
        const replace = tool.replace(
          regex,
          `<span class="bmGmSortHighlight">${sortValue.current.value}</span>`
        );

        return `<li key={index}>${replace}</li>`;
      })
      .slice(0, 5);

    bmGmSortTool.innerHTML = sortValue.current.value
      ? view.join("")
      : `<li key={index}>00-000-A-z</li>`;
    console.log(view);
    console.log(outTools);
    console.log(sortValue.current.value);
  };

  const setProduct = () => {
    localStorage.setItem("setProduct", JSON.stringify(true));
    setShowProductForm(JSON.parse(localStorage.getItem("setProduct")));
    setShowForm(false);
    setShowSort(false);
    setNoYetTools(false);
    setShowMaintenance(false);
  };

  const addProblem = () => {
    setShowForm(!showForm);
    setShowSort(false);
    setNoYetTools(false);
    setShowMaintenance(false);
    localStorage.removeItem("setProduct")
      ? localStorage.removeItem("setProduct")
      : localStorage.setItem("setProduct", JSON.stringify(false));
    setShowProductForm(JSON.parse(localStorage.getItem("setProduct")));
  };
  const checkMaintenance = () => {
    setShowMaintenance(!showMaintenance);
    setShowForm(false);
    setShowSort(false);
    setNoYetTools(false);
    localStorage.removeItem("setProduct")
      ? localStorage.removeItem("setProduct")
      : localStorage.setItem("setProduct", JSON.stringify(false));
    setShowProductForm(JSON.parse(localStorage.getItem("setProduct")));
  };
  const sortTool = () => {
    setShowSort(!showSort);
    setShowForm(false);
    setNoYetTools(false);
    setShowMaintenance(false);
    localStorage.removeItem("setProduct")
      ? localStorage.removeItem("setProduct")
      : localStorage.setItem("setProduct", JSON.stringify(false));
    setShowProductForm(JSON.parse(localStorage.getItem("setProduct")));
  };

  const sortingTool = (e) => {
    e.preventDefault();
    const numberName = sortValue.current.value;
    setAllGmTool(
      Object.values(allGmTool).filter((tool) => tool.toolNumber === numberName)
    );
  };

  const oldToNew = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };
  allGmTool = Object.values(allGmTool).sort(oldToNew);

  return (
    <>
      <Topbar />
      <div className="bmGm">
        <Sidebar />
        <div className="bmGmRight">
          <div className="bmGmBtnContainer">
            <button
              className="ordersButton"
              type="submit"
              onClick={() => setProduct()}
            >
              Product
            </button>


            <button
              className="ordersButton"
              type="submit"
              onClick={() => sortTool()}
            >
              Tools
            </button>

            <button
              className="ordersButton"
              type="submit"
              onClick={() => checkMaintenance()}
            >
              Maintenance
            </button>
            {/* {noYetTools && (
              <button
                className="ordersButton"
                type="submit"
                onClick={() => addProblem()}
              >
                Add new issue
              </button>
            )} */}
          </div>
          {showProductForm && (
            <div className="bmGmSortContainer">
              <ProductNumberGet />
              <Stempel />
            </div>
          )}
          {showSort && (
            <>
              <form
                className="bmGmSortContainer"
                autoComplete="off"
                onSubmit={sortingTool}
              >
                <label className="bmGmSortLabel" htmlFor="productNumber">
                  <p className="bmGmSortText">Please enter tool number:</p>
                  <input
                    className="bmGmSortInput"
                    type="text"
                    id="productNumber"
                    placeholder="00-000-a-z"
                    ref={sortValue}
                    required
                    onChange={showMyTool}
                  />
                  <ul className="bmGmSortTool">
                    <li>
                      <span>00-000-A-z</span>
                    </li>
                  </ul>
                </label>
                <div className="ordersButtonsContainer">
                  <button className="ordersButton" type="submit">
                    {noYetTools ? "Create Tool" : "Search"}
                  </button>
                  {noYetTools && (
                    <button
                      className="ordersButton"
                      // type="submit"
                      onClick={() => addProblem()}
                    >
                      Add new issue
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
          <div className="bmGmFormContainer">
            {showMaintenance && <Maintenance />}
            </div>
          <div className="bmGmFormContainer">
            {showForm && <GmToolsForm tool={sortValue.current.value} />}
          </div>
          {noYetTools !== true && (
            <div className="bmGmPostContainer">
              {Object.values(allGmTool)
                .slice(0, expandMore)
                .map((gmTool) => (
                  <PostGmTools key={gmTool._id} gmTool={gmTool} />
                ))}
              {allGmTool.length === expandMore ||
              allGmTool.length < expandMore ? (
                <> </>
              ) : (
                <div className="expandBtn">
                  <div
                    className="editBtn"
                    onClick={() => setExpandMore(expandMore + 5)}
                  >
                    <ExpandCircleDownOutlined />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
