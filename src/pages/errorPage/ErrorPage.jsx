import React from 'react'
import './errorPage.css'
// import Topbar from '../../components/topbar/Topbar'
// import Sidebar from '../../components/sidebar/Sidebar'

export default function ErrorPage() {
  return (
    <>
      <div className='safety'>
        <div className="safetyRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment"><span style={{ textTransform: "lowercase", fontWeight: "bold" }}>n</span>M<span style={{ textTransform: "lowercase", fontWeight: "bold" }}>emo</span> Error :(</h2>
            <h3 className="underDevelopmentTitle">404 - Page Not Found</h3>
            <h3 className="underDevelopmentSubtitle">Sorry, the page you are looking for could not be found.</h3>
          </div>
        </div>
      </div>
    </>
  )
}
