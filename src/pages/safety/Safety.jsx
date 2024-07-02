import React, { useState } from 'react'
import './safety.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import SafetyMeldingMilieu from '../../components/safetyMeldingMilieu/SafetyMeldingMilieu'

export default function Safety() {
  const [openForm, setOpenForm] = useState(false)

  const openFormHandler = () => {
    setOpenForm(!openForm)
  }

  return (
    <div>
      <>
      <Topbar />
      <div className='safety'>
        <Sidebar />
        <div className="safetyRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <div className="safetyInner">
                    <div className="safetyInform">
                        <h2 className="safetyInformTitle">Reporting of a dangerous situation</h2>
                        <p className="safetyInformText">
                            Use this form for situations that are inconvenient or harmful to your health. Nothing
                            happened yet.
                        </p>
                        <a className="safetyInformBtn buttonBtn"
                            href="https://forms.office.com/Pages/ResponsePage.aspx?id=4-w24L2PKk-_DevH4k2ml1GDO8KN0BRBtYSuo3flCB1UMjY4U1BKU0wxWUM0NjYwMktKUFJMUDI2OC4u&qrcode=true">Report</a>
                        <div className="safetyInformLine"></div>
                        <h2 className="safetyInformTitle">Environmental message</h2>
                        <p className="safetyInformText">
                            Use this form for situations that endanger the environment.
                        </p>
                        <button className="safetyInformBtn buttonBtn"
                            onClick={openFormHandler}>Report</button>
                            {openForm && 
                            <div className="safetyInformForm">
                                {/* <form className="safetyInformFormInner">
                                    <div className="safetyInformFormInnerInput">
                                        <label className="safetyInformFormInnerLabel">Message</label>
                                        <textarea className="safetyInformFormInnerTextarea"></textarea>
                                    </div>
                                    <button className="safetyInformFormInnerBtn buttonBtn">Send</button>
                                </form> */}
                                <SafetyMeldingMilieu />
                                </div>
                                }
                        <div className="safetyInformLine"></div>
                        <h2 className="safetyInformTitle">Reporting an incident/accident</h2>
                        <p className="safetyInformText">
                            Use this form if there is an incident or accident.
                            Always notify your <span>team leader</span> first!
                        </p>
                        <a className="safetyInformBtn buttonBtn"
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
