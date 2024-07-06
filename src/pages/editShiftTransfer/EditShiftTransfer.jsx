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
import { Edit, HighlightOff, CleaningServices, Lock, LockOpen, Label } from "@mui/icons-material"
import { renderToString } from 'react-dom/server'
import DateTimeShift from '../../components/dateTimeShift/DateTimeShift'

export default function EditShiftTransfer() {
  const API = process.env.REACT_APP_SERVER_API
  let [postsShiftTransfer, setPostsShiftTransfer] = useState([]);
  const { user } = useContext(AuthContext)
  let [allShiftsTransfers, setAllShiftsTransfers] = useState([]);
  let [allShiftTransferItems, setAllShiftTransferItems] = useState([]);
  let [allShiftsTransfersSort, setAllShiftsTransfersSort] = useState([]);
  const [hideShiftTransferItemForm, setHideShiftTransferItemForm] = useState(false);
  const [hideShiftTransferSorting, setHideShiftTransferSorting] = useState(false);
  const [hideShiftSorting, setHideShiftSorting] = useState(false);
  const [getShTrItem, setGetShTrItem] = useState({});
  const item = useRef();

  const sortDay = useRef();
  const sortWeek = useRef();
  const sortMonth = useRef();
  const sortType = useRef();
  const sortValue = useRef();

  const shiftNow = renderToString(<DateTimeShift />)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/shiftTransfers/allShiftTransfers`);
        setAllShiftsTransfers(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [API]);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/shiftTransfersItems/allShiftTransfersItems`);
        setAllShiftTransferItems(res.data);
        // console.log(res.data);
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
  }, [API]);

  useEffect(() => {
    const fetchPostsShiftTransfer = async () => {
      const res = await axios.get(`${API}/shiftTransfers/profile/` + user.personnelnumber)
      setPostsShiftTransfer(res.data.sort((st1, st2) => {
        return new Date(st2.createdAt) - new Date(st1.createdAt);
      }));
    };
    fetchPostsShiftTransfer();
  }, [user.personnelnumber, API])

  const deleteShiftTransfer = async (id) => {
    try {
      await axios.delete(`${API}/shiftTransfers/${id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  const handleHideShiftTransferSorting = () => {
    setHideShiftTransferSorting(!hideShiftTransferSorting);
    if (hideShiftTransferSorting) {
      window.location.reload();
    }
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
      await axios.delete(`${API}/shiftTransfersItems/${stItems._id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }


  // sort shifts transfers by date and time
  if (hideShiftTransferSorting === false) {
    const oldToNew = (a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    allShiftsTransfers = Object.values(allShiftsTransfers).filter(shift => (shift.date === new Date().toLocaleDateString('nl-NL')) && (shift.shift === shiftNow));
  }



  // create prepared text in database 
  const handleClickCreate = async (e) => {
    e.preventDefault();
    const newItem = {
      title: item.current.value,
    };
    try {
      console.log(newItem)
      await axios.post(`${API}/shiftTransfersItems`, newItem);
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
      await axios.put(`${API}/shiftTransfersItems/${getShTrItem._id}`, newItem);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const handleShTrItemClear = () => {
    setGetShTrItem({});
    document.getElementById("item").defaultValue = "";
  }


  // Sorting by month
  const handleSortMonth = async () => {
    const monthSort = sortMonth.current.value;
    console.log(new Date(monthSort).toLocaleDateString('nl-NL').split('-')[1] + "-" + new Date(monthSort).toLocaleDateString('nl-NL').split('-')[2])
    const oldToNew = (a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    setAllShiftsTransfersSort(Object.values(allShiftsTransfers).filter(shift => (shift.date.split('-')[1] + "-" + shift.date.split('-')[2]) === (new Date(monthSort).toLocaleDateString('nl-NL').split('-')[1] + "-" + new Date(monthSort).toLocaleDateString('nl-NL').split('-')[2])));
    console.log(allShiftsTransfersSort);
  }

  // Sorting by day
  const handleSortDay = async () => {
    const daySort = sortDay.current.value;
    console.log(daySort)
    console.log(new Date(daySort).toLocaleDateString('nl-NL'))
    const oldToNew = (a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    setAllShiftsTransfersSort(Object.values(allShiftsTransfers).filter(shift => shift.date === new Date(daySort).toLocaleDateString('nl-NL')));
  }

  // Sorting by week
  const handleSortWeek = async () => {
    console.log(sortWeek.current.value.split('-W')[0])
    const weekSort = sortWeek.current.value.split('W')[1];
    console.log(weekSort)
    const oldToNew = (a, b) => {
      return new Date(b.weekNumber) - new Date(a.weekNumber);
    }
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    setAllShiftsTransfersSort(Object.values(allShiftsTransfers).filter(shift => (shift.weekNumber === weekSort) && (shift.date.split('-')[2] === sortWeek.current.value.split('-W')[0])));
    console.log(allShiftsTransfersSort);
  }

  const handleSortByTypeAndValue = () => {
    const typeSort = sortType.current.value;
    const valueSort = sortValue.current.value;
    console.log(typeSort)
    console.log(valueSort)
    if (typeSort === "wals") {
      const wals = "Wals " + valueSort;
      console.log(wals)
      setAllShiftsTransfersSort(Object.values(allShiftsTransfers).filter(shift => shift.line === wals));
      // document.getElementById("sortWals").disabled = true;
    }
    if (typeSort === "operators") {
      const operator = valueSort;
      console.log(operator)
      setAllShiftsTransfersSort(Object.values(allShiftsTransfers).filter(shift => shift.operator === operator));
      // document.getElementById("sortOperators").disabled = true;
    }
    if (typeSort === "shifts") {
      const shift = valueSort;
      console.log(shift)
      setAllShiftsTransfersSort(Object.values(allShiftsTransfers).filter(shift => shift.shift === shift));
      // document.getElementById("sortShifts").disabled = true;
    }
    if (typeSort === "clear") {
      window.location.reload();
    }
    // document.getElementById("sortType").value = "";
    // document.getElementById("sortValue").value = "";
  }

  const chooseSortOfShift = () => {
    const typeSort = sortType.current.value;
    if (typeSort === "shifts") {
      setHideShiftSorting(!hideShiftSorting);
    } else {
      setHideShiftSorting(hideShiftSorting);
    }
  }

  const handleSortClear = () => {
    window.location.reload();
  }

  return (
    <>
      <Topbar />
      <div className='editShiftTransfer'>
        <Sidebar />
        <div className="editShiftTransferRight">

          <div className="editShiftTransferRightContent">
            {!hideShiftTransferItemForm &&
              <>
                {user.role === 0 || user.isAdmin ? <button className="editShiftTransferShowHideBtn" onClick={() => handleHideShiftTransferSorting(true)}>{hideShiftTransferSorting ? "Hide sorting panel" : "Show sorting panel"}</button> : null}
              </>}
            {!hideShiftTransferSorting &&
              <>
                {user.role === 0 || user.isAdmin ? <button className="editShiftTransferShowHideBtn" onClick={() => handleHideShiftTransferItemForm(true)}>{hideShiftTransferItemForm ? "Hide Edit or Add Items" : "Show Edit or Add Items"}</button> : null}
              </>}

            {user.role === 0 || user.isAdmin ? <>
              {hideShiftTransferSorting && <div className="editShiftTransferRightSorting editShiftTransferListWrapper">
                <h2 className="editShiftTransferRightSortingTitle">sort transfer shift</h2>
                <label className="editShiftTransferRightSortingLabel">
                  <p className="editShiftTransferRightSortingText">Sort by month</p>
                  <input className="editShiftTransferRightSortingInput" type="month" id='sortMonth' ref={sortMonth}
                    onChange={() => handleSortMonth()} />
                  <div className="notActiveBtn">
                    <Lock />
                  </div>
                </label>
                <label className="editShiftTransferRightSortingLabel">
                  <p className="editShiftTransferRightSortingText">Sort by week</p>
                  <input className="editShiftTransferRightSortingInput" type="week" id='sortWeek' ref={sortWeek} onChange={() => handleSortWeek()} disabled={hideShiftTransferItemForm} />
                  <div className="notActiveBtn">
                    <LockOpen />
                  </div>
                </label>
                <label className="editShiftTransferRightSortingLabel">
                  <p className="editShiftTransferRightSortingText">Sort by day</p>
                  <input className="editShiftTransferRightSortingInput" type="date" id='sortDay' ref={sortDay} onChange={() => handleSortDay()} onfocus="(this.type='date')" />
                  <div className="notActiveBtn">
                    <LockOpen />
                  </div>
                </label>
                <div className="sortingBox">
                  <select className="editShiftTransferRightSortingInput" defaultValue="clear" ref={sortType} onClick={() => chooseSortOfShift(sortType)} >
                    <option className="editShiftTransferRightSortingInput" value="clear">Clear All</option>
                    <option className="editShiftTransferRightSortingInput" id='sortOperators' value="operators">Operator</option>
                    <option className="editShiftTransferRightSortingInput" id='sortShifts' value="shifts">Shift</option>
                    <option className="editShiftTransferRightSortingInput" id='sortWals' value="wals">Wals</option>
                  </select>
                  {hideShiftSorting && <select className="editShiftTransferRightSortingInput" defaultValue={shiftNow} ref={sortValue} >
                    <option className="editShiftTransferRightSortingInput" id='morning' value="Morning">Morning</option>
                    <option className="editShiftTransferRightSortingInput" id='afternoon' value="Afternoon">Afternoon</option>
                    <option className="editShiftTransferRightSortingInput" id='night' value="Night">Night</option>
                  </select>}
                  {!hideShiftSorting && <input className="editShiftTransferRightSortingInput" type="text" id='sortType' ref={sortValue} style={{ width: "115px" }} />}
                  <button className="editProfileButtonGet" id='sortValue' onClick={() => handleSortByTypeAndValue()} >Sort</button>
                </div>
                {/* <button className="editProfileButtonGet" onClick={() => handleSortClear()} >Sort Clear</button> */}
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



            {hideShiftTransferSorting ?

              <ul className="editShiftTransferPostsList">
                {(user.role === 2 || user.role === 0) &&
                  (Object.values(allShiftsTransfersSort).map((st => (
                    <li className="nMemoViev" key={st._id}>
                      <PostShiftTransfer shiftTransfer={st} />
                    </li>
                  ))))}
              </ul> :
              <ul className="editShiftTransferPostsList">
                {(user.role === 2 || user.role === 0) &&
                  (Object.values(allShiftsTransfers).map((st => (
                    <li className="nMemoViev" key={st._id}>
                      <PostShiftTransfer shiftTransfer={st} />
                    </li>
                  ))))}
              </ul>}

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
