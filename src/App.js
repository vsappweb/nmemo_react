import ErrorPage from "./pages/errorPage/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import EditEvents from "./pages/editEvents/EditEvents";
import EditShiftTransfer from "./pages/editShiftTransfer/EditShiftTransfer";
import Safety from "./pages/safety/Safety";
import Events from "./pages/events/Events";
import Orders from "./pages/orders/Orders";
import NewsBrief from "./pages/newsBrief/NewsBrief";
import BmGm from "./pages/bmGm/BmGm";
import NMemo from "./pages/nMemo/NMemo";
import SendTlToLine from "./pages/sendTlToLine/SendTlToLine";
import Groups from "./pages/groups/Groups";
import License from "./pages/license/License";

// import { useTranslation } from "react-i18next";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  // const { t, i18n } = useTranslation();

  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language);
  // };

  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="login/*"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="register/*"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="messenger/*"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route path="profile/:personnelnumber/*" element={<Profile />} />
        <Route
          path="editProfile/:personnelnumber/*"
          element={<EditProfile />}
        />
        <Route path="editEvents/:personnelnumber/*" element={<EditEvents />} />
        <Route
          path="editShiftTransfer/:personnelnumber/*"
          element={<EditShiftTransfer />}
        />
        <Route path="events/:personnelnumber/*" element={<Events />} />
        <Route path="orders/:personnelnumber/*" element={<Orders />} />
        <Route path="newsBrief/:personnelnumber/*" element={<NewsBrief />} />
        <Route path="safety/*" element={<Safety />} />
        <Route path="bmGm/:personnelnumber/*" element={<BmGm />} />
        <Route path="groups/:personnelnumber/*" element={<Groups />} />
        <Route path="nMemo/:personnelnumber/*" element={<NMemo />} />
        <Route
          path="sendTlToLine/:personnelnumber/*"
          element={<SendTlToLine />}
        />
        <Route path="license/*" element={<License />} />
      </Routes>
    </Router>
  );
}

export default App;
