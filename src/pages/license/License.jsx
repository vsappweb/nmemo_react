import React from 'react'
import './license.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

export default function License() {
  return (
    <>
      <Topbar />
      <div className='safety'>
        <Sidebar />
        <div className="safetyRight">
          <div className="underDevelopmentContainer">
            <div className="main__inner">
              <div className="main__license">
                <p className="main__license-text">
                  Copyright 2024 Vadym Sirenko
                </p>
                <p className="main__license-text">
                  Permission is hereby granted, free of charge, to any person obtaining a copy of this
                  software
                  and associated documentation files (the “Software”), to deal in the Software without
                  restriction, including without limitation the rights to use, copy, modify, merge, publish,
                  distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
                  the
                  Software is furnished to do so, subject to the following conditions:
                </p>
                <p className="main__license-text">
                  The above copyright notice and this permission notice shall be included in all copies or
                  substantial portions of the Software.
                </p>
                <p className="main__license-text">
                  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                  INCLUDING
                  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                  FROM,
                  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </div>
              <div className="main__license"></div>
              <p className="main__license-text">
                Icon designer:
                Arturo (Wibawa) <br />
                Akar Icons Pack <br />
                License: MIT (Open Source)
              </p>
            </div>


          </div>
        </div>
      </div>
        </>
        )
}
