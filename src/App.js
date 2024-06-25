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
import Logistics from "./pages/logistics/Logistics";
import NMemo from "./pages/nMemo/NMemo";
import SendTlToLine from "./pages/sendTlToLine/SendTlToLine";
import Groups from "./pages/groups/Groups";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";


function App() {

  const { user } = useContext(AuthContext)
  return (

    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="login/*" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="register/*" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="messenger/*" element={!user ? <Navigate to="/" /> : <Messenger />} />
        <Route path="profile/:personnelnumber/*" element={<Profile />} />
        <Route path="editProfile/:personnelnumber/*" element={<EditProfile />} />
        <Route path="editEvents/:personnelnumber/*" element={<EditEvents />} />
        <Route path="editShiftTransfer/:personnelnumber/*" element={<EditShiftTransfer />} />
        <Route path="events/:personnelnumber/*" element={<Events />} /> 
        <Route path="orders/:personnelnumber/*" element={<Orders />} /> 
        <Route path="safety/:personnelnumber/*" element={<Safety />} />
        <Route path="logistics/:personnelnumber/*" element={<Logistics />} />
        <Route path="groups/:personnelnumber/*" element={<Groups />} />
        <Route path="nMemo/:personnelnumber/*" element={<NMemo />} />
        <Route path="sendTlToLine/:personnelnumber/*" element={<SendTlToLine />} />
      </Routes>
    </Router>

  )
}

export default App;
