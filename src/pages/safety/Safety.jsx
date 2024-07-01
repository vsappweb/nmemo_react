import React from 'react'
import './safety.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

export default function Safety() {
  return (
    <div>
      <>
      <Topbar />
      <div className='safety'>
        <Sidebar />
        <div className="safetyRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <h3 className="underDevelopmentTitle">Page <span> safety</span></h3>
            <h3 className="underDevelopmentSubtitle">coming soon</h3>
            <div class="main__inner">
                    <div class="main__inform">
                        <h2 class="main__inform-title">Reporting of a dangerous situation</h2>
                        <p class="main__inform-text">
                            Use this form for situations that are inconvenient or harmful to your health. Nothing
                            happened yet.
                        </p>
                        <a class="main__inform-btn button__desktop-pres"
                            href="https://forms.office.com/Pages/ResponsePage.aspx?id=4-w24L2PKk-_DevH4k2ml1GDO8KN0BRBtYSuo3flCB1UMjY4U1BKU0wxWUM0NjYwMktKUFJMUDI2OC4u&qrcode=true">Report</a>
                        <div class="main__inform-line"></div>
                        <h2 class="main__inform-title">Environmental message</h2>
                        <p class="main__inform-text">
                            Use this form for situations that endanger the environment.
                        </p>
                        <a class="main__inform-btn button__desktop-pres"
                            href="https://forms.office.com/Pages/ResponsePage.aspx?id=4-w24L2PKk-_DevH4k2ml1GDO8KN0BRBtYSuo3flCB1UN0NPMkw1QTlZODdaS1pHMEdSSUtNUFFVVC4u&qrcode=true">Report</a>
                        <div class="main__inform-line"></div>
                        <h2 class="main__inform-title">Reporting an incident/accident</h2>
                        <p class="main__inform-text">
                            Use this form if there is an incident or accident.
                            Always notify your <span>team leader</span> first!
                        </p>
                        <a class="main__inform-btn button__desktop-pres"
                            href="https://forms.office.com/Pages/ResponsePage.aspx?id=4-w24L2PKk-_DevH4k2ml1GDO8KN0BRBtYSuo3flCB1UQTdYQ05RTVU2TkYxQzRBMkQ1Q1c0RVkxNC4u&qrcode=true">Report</a>

                    </div>

                </div>
          </div>
        </div>
      </div>
    </>
    </div>
  )
}
