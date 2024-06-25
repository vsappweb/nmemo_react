import { useState, useEffect, useContext, useRef } from 'react'
import './editShiftTransfer.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import PostShiftTransfer from '../../components/postShiftTransfer/PostShiftTransfer'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import RightbarMonitoring from '../../components/rightbarMonitoring/RightbarMonitoring'
import ShiftTransfer2 from '../../components/shiftTransfer2/ShiftTransfer2'
import { Edit, HighlightOff, CleaningServices } from "@mui/icons-material"
import { renderToString } from 'react-dom/server'
import DateTimeShift from '../../components/dateTimeShift/DateTimeShift'

export default function EditShiftTransfer() {
  let [postsShiftTransfer, setPostsShiftTransfer] = useState([]);
  const { user } = useContext(AuthContext)
  let [allShiftsTransfers, setAllShiftsTransfers] = useState([]);
  let [allShiftTransferItems, setAllShiftTransferItems] = useState([]);
  const [hideShiftTransferItemForm, setHideShiftTransferItemForm] = useState(false);
  const [hideShiftTransferSorting, setHideShiftTransferSorting] = useState(false);
  const [getShTrItem, setGetShTrItem] = useState({});
  const item = useRef();

  const shiftNow = renderToString(<DateTimeShift />)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/shiftTransfers/allShiftTransfers");
        setAllShiftsTransfers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get("/shiftTransfersItems/allShiftTransfersItems");
        setAllShiftTransferItems(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    let result = fetchData();
    if (!result) {
      interval = setInterval(fetchData, 60000);
    }
    interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPostsShiftTransfer = async () => {
      const res = await axios.get("/shiftTransfers/profile/" + user.personnelnumber)
      setPostsShiftTransfer(res.data.sort((st1, st2) => {
        return new Date(st2.createdAt) - new Date(st1.createdAt);
      }));
    };
    fetchPostsShiftTransfer();
  }, [user.personnelnumber])

  const deleteShiftTransfer = async (id) => {
    try {
      await axios.delete(`/shiftTransfers/${id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  const handleHideShiftTransferSorting = () => {
    setHideShiftTransferSorting(!hideShiftTransferSorting);
  }
  const handleHideShiftTransferItemForm = () => {
    setHideShiftTransferItemForm(!hideShiftTransferItemForm);
  }

  // get shift transfer item
  const handleShTrItemGet = (stItems) => {
    console.log(getShTrItem)
    setGetShTrItem(stItems)
    console.log(getShTrItem)
  }

  // delete shift transfer item
  const handleShTrItemDelete = async (stItems) => {
    try {
      await axios.delete(`/shiftTransfersItems/${stItems._id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }


  // sort shifts transfers by date and time
  const oldToNew = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }
  allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
  allShiftsTransfers = Object.values(allShiftsTransfers).filter(shift => (shift.date === new Date().toLocaleDateString('nl-NL')) && (shift.shift === shiftNow));



  // create prepared text in database 
  const handleClickCreate = async (e) => {
    e.preventDefault();
    const newItem = {
      title: item.current.value,
    };
    try {
      console.log(newItem)
      await axios.post("/shiftTransfersItems", newItem);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  // edit prepared text by id from database
  const handleClickEdit = async (e) => {
    e.preventDefault();
    const newItem = {
      title: item.current.value,
    };
    try {
      await axios.put(`/shiftTransfersItems/${getShTrItem._id}`, newItem);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const handleShTrItemClear = () => {
    setGetShTrItem({});
    document.getElementById("item").defaultValue = "";
  }


  return (
    <>
      <Topbar />
      <div className='editShiftTransfer'>
        <Sidebar />
        <div className="editShiftTransferRight">

          <div className="editShiftTransferRightContent">
            {user.role === 0 || user.isAdmin ? <button className="editShiftTransferShowHideBtn" onClick={() => handleHideShiftTransferSorting(true)}>{hideShiftTransferSorting ? "Hide sorting panel" : "Show sorting panel"}</button> : null}
            {user.role === 0 || user.isAdmin ? <button className="editShiftTransferShowHideBtn" onClick={() => handleHideShiftTransferItemForm(true)}>{hideShiftTransferItemForm ? "Hide Edit or Add Items" : "Show Edit or Add Items"}</button> : null}

            {user.role === 0 || user.isAdmin ? <>
              {hideShiftTransferSorting && <div className="editShiftTransferRightSorting editShiftTransferListWrapper">
                <h2 className="editShiftTransferRightSortingTitle">sort transfer shift</h2>
                <input className="editShiftTransferRightSortingInput" type="date" placeholder="Date" />
                <select className="editShiftTransferRightSortingInput" defaultValue="3" >
                  <option className="editShiftTransferRightSortingInput" value="1">Operator</option>
                  <option className="editShiftTransferRightSortingInput" value="2">Shift</option>
                  <option className="editShiftTransferRightSortingInput" value="3">Wals</option>
                  <option className="editShiftTransferRightSortingInput" value="4">Week</option>
                </select>
                <input className="editShiftTransferRightSortingInput" type="text" />
                <button className="editProfileButtonGet" onClick={() => window.location.reload()} >sort</button>
              </div>}
            </> : <></>}

            {hideShiftTransferItemForm ? <div className="editShiftTransferListWrapper">
              <div className="editShiftTransferItemsListContainer editShiftTransferScrollbar">
                <ul className="editShiftTransferItemsList">
                  {Object.values(allShiftTransferItems).map((stItems, i) => {
                    return (
                      <li className="editShiftTransferItemsItem" key={stItems._id}>
                        {user.role === 0 || user.isAdmin ? <div className="editShiftTransferItemDo">
                          <div className="editShiftTransferItemBtnsTop">
                            <p className="editShiftTransferItemNumber">{i + 1}</p>
                            <div className="editShiftTransferItemBtns">
                              <div className="editShiftTransferItemEdit">
                                <Edit className="shiftTransferItemEdit" onClick={() => handleShTrItemGet(stItems)} />
                              </div>
                              <div className="editShiftTransferItemDelete">
                                <HighlightOff className="shiftTransferItemDelete" onClick={() => handleShTrItemDelete(stItems)} />
                              </div>
                            </div>
                          </div>
                          <div className="editShiftTransferItemContent">
                            <p className="editShiftTransferItemTitle">{stItems.title}</p>
                          </div>
                        </div> : null}
                      </li>
                    )
                  })}
                </ul>
                {user.role === 0 || user.isAdmin ?
                  <form className="shiftTransferItemForm" id="shiftTransferItemForm" onSubmit={getShTrItem._id === undefined ? handleClickCreate : handleClickEdit}>
                    <label className="shiftTransferItemItem" htmlFor="item">
                      <textarea className="shiftTransferItemInput" type="text" placeholder="New text" id="item" ref={item} defaultValue={"" || getShTrItem.title} required />
                    </label>
                    <div className="shiftTransferItemFormBtns">
                      {getShTrItem._id === undefined ? null : <CleaningServices className="shiftTransferItemBtn" onClick={() => handleShTrItemClear()} />}
                      <button className="shiftTransferItemBtn" type="submin" >{getShTrItem._id === undefined ? "Create" : "Edit"}</button>
                    </div>
                  </form> :
                  <></>}
              </div>
              <div className="editShiftTransferFormWrapper">
                <ShiftTransfer2 />
              </div>
            </div>
              : <></>}



            <ul className="editShiftTransferPostsList">
              {(user.role === 2 || user.role === 0) &&
                (Object.values(allShiftsTransfers).map((st => (
                  <li className="nMemoViev" key={st._id}>
                    <PostShiftTransfer shiftTransfer={st} />
                  </li>
                ))))}
            </ul>

            {user.role === 3 &&
              <ul>
                {postsShiftTransfer.map((st) => (
                  <li key={st._id}>
                    <PostShiftTransfer key={st._id} shiftTransfer={st} />
                  </li>
                ))}
              </ul>}
          </div>
        </div>
        {(user.role === 2 || user.role === 0) ? <RightbarMonitoring /> : <Rightbar />}
      </div>
    </>
  )
}
