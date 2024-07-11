import React, { useEffect, useState } from 'react'
import './bmGm.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import GmToolsForm from '../../components/gmToolsForm/GmToolsForm'
import PostGmTools from '../../components/postGmTools/PostGmTools'


import axios from 'axios'

export default function BmGm() {
  const [allGmTool, setAllGmTool] = useState([]);
  const API = process.env.REACT_APP_SERVER_API





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



  return (
    <>
      <Topbar />
      <div className='bmGm'>
        <Sidebar />
        <div className="bmGmRight">
          <div className="bmGmFormContainer">

            <GmToolsForm />
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
