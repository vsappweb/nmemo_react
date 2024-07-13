import React, { useEffect, useRef, useState } from 'react'
import './bmGm.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import GmToolsForm from '../../components/gmToolsForm/GmToolsForm'
import PostGmTools from '../../components/postGmTools/PostGmTools'
import ProductNumberGet from '../../components/productNumberGet/ProductNumberGet'
import Stempel from '../../components/stempel/Stempel'


import axios from 'axios'

export default function BmGm() {
  let [allGmTool, setAllGmTool] = useState([]);
  const API = process.env.REACT_APP_SERVER_API
  const [showForm, setShowForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const sortValue = useRef();





  useEffect(() => {
    const getGmTools = async () => {
      try {
        const res = await axios.get(`${API}/gmTools/allGmTool`);
        setAllGmTool(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGmTools()
  }, [API]);

  const setProduct =()=>{
    setShowProductForm(!showProductForm)
    setShowForm(false)
    setShowSort(false)
  }

  const addProblem = () => {
    setShowForm(!showForm)
    setShowSort(false)
    setShowProductForm(false)
  }
  const sortTool = () => {
    setShowSort(!showSort)
    setShowForm(false)
    setShowProductForm(false)
  }


  // const sortingTool = (e) => {
  //   e.preventDefault();
  //     const numberName = sortValue;
  //     console.log(numberName)
  //     // const oldToNew = (a, b) => {
  //     //   return new Date(b.createdAt) - new Date(a.createdAt);
  //     // }
  //     // allGmTool = Object.values(allGmTool).sort(oldToNew);
  //     setAllGmTool(Object.values(allGmTool).filter(tool => tool.toolNumber === numberName));
  // }



  return (
    <>
      <Topbar />
      <div className='bmGm'>
        <Sidebar />
        <div className="bmGmRight">

          <div className="bmGmBtnContainer">
            <button className="ordersButton" type="submit" onClick={() => setProduct()}>Product</button>
            <button className="ordersButton" type="submit" onClick={() => addProblem()}>Add new issue</button>
            <button className="ordersButton" type="submit" onClick={() => sortTool()}>Sorting</button>
          </div>
          {showProductForm && <div className="bmGmSortContainer" >
            <ProductNumberGet />
            <Stempel />
          </div>}
          {showSort && <div className="bmGmSortContainer" >
            <label className="bmGmSortLabel" htmlFor="productNumber">
              <p className="bmGmSortText">Please enter tool number:</p>
              <input className="bmGmSortInput" type="text" id='productNumber' placeholder="00-000-a-z" ref={sortValue} required />
            </label>
            <button className="ordersButton" type="submit" >Sort</button>
          </div>}
          <div className="bmGmFormContainer">
            {showForm && <GmToolsForm />}
          </div>
          <div className="bmGmPostContainer">
            {Object.values(allGmTool).map((gmTool) => (
              <PostGmTools key={gmTool._id} gmTool={gmTool} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
