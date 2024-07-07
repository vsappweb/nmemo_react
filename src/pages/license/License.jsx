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
              <h3 className="LicenseTitle">nMemo</h3>
              <div className="License">
                <p className="LicenseText">
                  Copyright 2024 Vadym Sirenko
                </p>
                <p className="LicenseText">
                  Permission is hereby granted, free of charge, to any person obtaining a copy of this
                  software
                  and associated documentation files (the “Software”), to deal in the Software without
                  restriction, including without limitation the rights to use, copy, modify, merge, publish,
                  distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
                  the
                  Software is furnished to do so, subject to the following conditions:
                </p>
                <p className="LicenseText">
                  The above copyright notice and this permission notice shall be included in all copies or
                  substantial portions of the Software.
                </p>
                <p className="LicenseText">
                  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                  INCLUDING
                  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                  FROM,
                  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </div>
              <div className="License">
                <p className="LicenseText">
                Ideas and inspiration
                </p>
              </div>
              <div className="License">
                <p className="LicenseText">
                  Icon designer:
                  Arturo (Wibawa) <br />
                  Akar Icons Pack <br />
                  License: MIT (https://github.com/artcoholic/akar-icons#MIT-1-ov-file)
                </p>
              </div>
              <div className="License">
                <p className="LicenseText">
                  Weeknumber <br />
                  This script is released to the <a href="https://fairuse.stanford.edu/overview/public-domain/welcome/">public domain</a> and may be used, modified and
                  distributed without restrictions. Attribution not necessary but appreciated.
                  <br />
                  Source: https://weeknumber.net/how-to/javascript
                </p>
              </div>
              <div className="License">
                <p className="LicenseText">
                  <svg xmlns="http://www.w3.org/2000/svg" width="115" height="37" fill="none"><path fill="#0073E6" d="M11.995 12.023.753 5.441A.5.5 0 0 0 0 5.872v16.779a1.5 1.5 0 0 0 .728 1.286l3.515 2.109a.5.5 0 0 0 .757-.43v-11.27a.2.2 0 0 1 .3-.173l6.7 3.86a1 1 0 0 0 1 0l6.7-3.862a.2.2 0 0 1 .3.173v6.096a1 1 0 0 1-.477.853l-6.284 3.856a.5.5 0 0 0-.239.426v5.637a.5.5 0 0 0 .25.432l8.74 5.06a1 1 0 0 0 1.015-.007l11.51-6.906a1 1 0 0 0 .485-.857v-11.05a.5.5 0 0 0-.757-.43l-3.758 2.255a1 1 0 0 0-.485.857v5.65a.5.5 0 0 1-.243.43l-6.786 4.072a1 1 0 0 1-.962.037L17.5 28.5l7.015-4.209a1 1 0 0 0 .485-.857V5.872a.5.5 0 0 0-.753-.431l-11.242 6.582a1 1 0 0 1-1.01 0Z" /><path fill="#0073E6" d="M35 5.883v5.55a1 1 0 0 1-.486.858l-3.757 2.255a.5.5 0 0 1-.757-.43v-5.55a1 1 0 0 1 .485-.857l3.758-2.255a.5.5 0 0 1 .757.43Z" /><path fill="#090B0B" d="M50.38 28V9.8h4.498l7.566 10.504-3.328-.026L66.708 9.8h4.446V28h-4.966v-5.018c0-1.49.035-2.86.104-4.108.07-1.265.208-2.54.416-3.822l.52 1.612-5.642 7.28H59.87l-5.616-7.358.572-1.534a34.34 34.34 0 0 1 .416 3.744c.07 1.248.104 2.643.104 4.186V28H50.38Zm34.881.156c-1.768 0-3.336-.347-4.706-1.04-1.352-.693-2.409-1.655-3.172-2.886-.745-1.23-1.118-2.626-1.118-4.186V9.8h5.2v10.088c0 .763.165 1.43.494 2.002a3.43 3.43 0 0 0 1.352 1.326c.572.312 1.222.468 1.95.468.763 0 1.44-.156 2.028-.468a3.347 3.347 0 0 0 1.404-1.326c.347-.572.52-1.24.52-2.002V9.8h5.044v10.244c0 1.56-.38 2.955-1.144 4.186-.745 1.23-1.794 2.193-3.146 2.886-1.334.693-2.903 1.04-4.706 1.04ZM99.672 28v-4.316h4.186v-9.568h-4.186V9.8h13.494v4.316h-4.16v9.568h4.16V28H99.672Z" /></svg>
                  <br />
                  Licensing
                  <br />
                  MUI X is an open-core, MIT-licensed library. Purchase a commercial license for advanced features and support.
                  <br />
                  Source: https://mui.com/x/introduction/licensing/
                </p>
              </div>

              <div className="License">
                <p className="LicenseText">
                  <img className="LicenseLogoReact" src="../../assets/ico/logoReactLight.svg" alt="" />
                  <br />
                  MIT License
                  <br />
                  Copyright (c) Meta Platforms, Inc. and affiliates.
                  <br />
                  Source: https://github.com/facebook/react?tab=MIT-1-ov-file#readme
                </p>
              </div>
              <div className="License">
                <p className="LicenseText">
                  Backend dependencies Licenses
                  <br />
                  <br />
                  "bcrypt": "^5.1.1" - [bcrypt](https://github.com/kelektiv/node.bcrypt.js?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "cors": "^2.8.5" - [cors](https://github.com/expressjs/cors?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "dotenv": "^16.3.1" - [dotenv](https://github.com/motdotla/dotenv?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "express": "^4.18.2" - [express](https://github.com/expressjs/express?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "helmet": "^7.1.0" - [helmet](https://github.com/helmetjs/helmet?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "mongoose": "^8.0.0" - [mongoose](https://github.com/Automattic/mongoose?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "morgan": "^1.10.0" - [morgan](https://github.com/expressjs/morgan?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "multer": "^1.4.5-lts.1" - [multer](https://github.com/expressjs/multer?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "nodemon": "^3.0.1" - [nodemon](https://github.com/remy/nodemon?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "path": "^0.12.7" - [path](https://github.com/jinder/path?tab=MIT-1-ov-file#MIT-1-ov-file)
                  <br />
                  "socket.io": "^4.7.4" - [socket.io](https://github.com/socketio/socket.io?tab=MIT-1-ov-file#MIT-1-ov-file)
                </p>
              </div>
              <div className="License">
                <p className="LicenseText">
                  Frontend dependencies Licenses
                  <br />
                  <br />
                  </p>
              </div>
            </div>


          </div>
        </div>
      </div >
    </>
  )
}
