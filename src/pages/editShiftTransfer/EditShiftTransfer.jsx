import { useState, useEffect, useContext, useRef } from "react";
import "./editShiftTransfer.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import PostShiftTransfer from "../../components/postShiftTransfer/PostShiftTransfer";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import RightbarMonitoring from "../../components/rightbarMonitoring/RightbarMonitoring";
import ShiftTransfer2 from "../../components/shiftTransfer2/ShiftTransfer2";
import {
  Edit,
  HighlightOff,
  CleaningServices,
  Lock,
  LockOpen,
  ExpandCircleDownOutlined,
} from "@mui/icons-material";
import { renderToString } from "react-dom/server";
import DateTimeShift from "../../components/dateTimeShift/DateTimeShift";
import { Link } from "react-router-dom";

export default function EditShiftTransfer() {
  const API = process.env.REACT_APP_SERVER_API;
  const date = new Date();
  let [postsShiftTransfer, setPostsShiftTransfer] = useState([]);
  const { user } = useContext(AuthContext);
  let [allShiftsTransfers, setAllShiftsTransfers] = useState([]);
  let [allShiftTransferItems, setAllShiftTransferItems] = useState([]);
  let [allShiftsTransfersSort, setAllShiftsTransfersSort] = useState([]);
  let [allShiftsTransfersSecondQuery, setAllShiftsTransfersSecondQuery] =
    useState([]); //second query for sorting
  const [hideShiftTransferItemForm, setHideShiftTransferItemForm] =
    useState(false);
  const [hideShiftTransferSorting, setHideShiftTransferSorting] =
    useState(false);
  const [hideShiftSorting, setHideShiftSorting] = useState(false);
  const [getShTrItem, setGetShTrItem] = useState({});
  const [lockMonth, setLockMonth] = useState(false);
  const [lockWeek, setLockWeek] = useState(false);
  const [lockDay, setLockDay] = useState(false);
  const [hideShiftTransferForm, setHideShiftTransferForm] = useState(true);
  const [expandMore, setExpandMore] = useState(7);
  const item = useRef();

  const sortDay = useRef();
  const sortWeek = useRef();
  const sortMonth = useRef();
  const sortType = useRef();
  const sortValue = useRef();

  const shiftNow = renderToString(<DateTimeShift />);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/shiftTransfers/allShiftTransfers`);
        setAllShiftsTransfers(res.data);
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
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/shiftTransfersItems/allShiftTransfersItems`
        );
        setAllShiftTransferItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    let result = fetchData();
    if (!result) {
      interval = setInterval(fetchData, 20000);
    }
    interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, [API]);

  useEffect(() => {
    const fetchPostsShiftTransfer = async () => {
      const res = await axios.get(
        `${API}/shiftTransfers/profile/` + user.personnelnumber
      );
      setPostsShiftTransfer(
        res.data.sort((st1, st2) => {
          return new Date(st2.createdAt) - new Date(st1.createdAt);
        })
      );
    };
    fetchPostsShiftTransfer();
  }, [user.personnelnumber, API]);

  const handleHideShiftTransferSorting = () => {
    setHideShiftTransferSorting(!hideShiftTransferSorting);
    if (hideShiftTransferSorting) {
      window.location.reload();
    }
  };
  const handleHideShiftTransferItemForm = () => {
    setHideShiftTransferItemForm(!hideShiftTransferItemForm);
  };

  // get shift transfer item
  const handleShTrItemGet = (stItems) => {
    setGetShTrItem(stItems);
  };

  // delete shift transfer item
  const handleShTrItemDelete = async (stItems) => {
    try {
      await axios.delete(`${API}/shiftTransfersItems/${stItems._id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // sort shifts transfers by date and time
  if (hideShiftTransferSorting === false) {
    const oldToNew = (a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    };
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    allShiftsTransfers = Object.values(allShiftsTransfers).filter(
      (shift) =>
        shift.date === new Date().toLocaleDateString("nl-NL") &&
        shift.shift === shiftNow
    );
  }

  // create prepared text in database
  const handleClickCreate = async (e) => {
    e.preventDefault();
    const newItem = {
      title: item.current.value,
    };
    try {
      await axios.post(`${API}/shiftTransfersItems`, newItem);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
      console.log(err);
    }
  };

  const handleShTrItemClear = () => {
    setGetShTrItem({});
    document.getElementById("item").defaultValue = "";
  };

  // Sorting by month
  const handleSortMonth = async () => {
    const monthSort = sortMonth.current.value;
    // console.log(
    //   new Date(monthSort).toLocaleDateString("nl-NL").split("-")[1] +
    //     "-" +
    //     new Date(monthSort).toLocaleDateString("nl-NL").split("-")[2]
    // );
    const oldToNew = (a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    };
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    setAllShiftsTransfersSort(
      Object.values(allShiftsTransfers).filter(
        (shift) =>
          shift.date.split("-")[1] + "-" + shift.date.split("-")[2] ===
          new Date(monthSort).toLocaleDateString("nl-NL").split("-")[1] +
            "-" +
            new Date(monthSort).toLocaleDateString("nl-NL").split("-")[2]
      )
    );
    document.getElementById("sortDay").value = "";
    document.getElementById("sortWeek").value = "";
  };

  // Sorting by day
  const handleSortDay = async () => {
    const daySort = sortDay.current.value;
    const oldToNew = (a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    };
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    setAllShiftsTransfersSort(
      Object.values(allShiftsTransfers).filter(
        (shift) => shift.date === new Date(daySort).toLocaleDateString("nl-NL")
      )
    );
    if (lockMonth) {
      setAllShiftsTransfersSecondQuery(
        Object.values(allShiftsTransfers).filter(
          (shift) =>
            shift.date === new Date(daySort).toLocaleDateString("nl-NL")
        )
      );
    }
    document.getElementById("sortMonth").value = "";
    document.getElementById("sortWeek").value = "";
  };

  // Sorting by week
  const handleSortWeek = async () => {
    const weekSort = sortWeek.current.value.split("W")[1];
    const oldToNew = (a, b) => {
      return new Date(b.weekNumber) - new Date(a.weekNumber);
    };
    allShiftsTransfers = Object.values(allShiftsTransfers).sort(oldToNew);
    setAllShiftsTransfersSort(
      Object.values(allShiftsTransfers).filter(
        (shift) =>
          shift.weekNumber === weekSort &&
          shift.date.split("-")[2] === sortWeek.current.value.split("-W")[0]
      )
    );
    document.getElementById("sortMonth").value = "";
    document.getElementById("sortDay").value = "";
  };

  const handleSortByTypeAndValue = () => {
    const typeSort = sortType.current.value;
    const valueSort = sortValue.current.value;
    // sorting by type and value (wals -- months)
    if (
      typeSort === "wals" &&
      lockMonth === false &&
      lockWeek === false &&
      lockDay === false
    ) {
      const wals = "Wals " + valueSort;
      setAllShiftsTransfersSort(
        Object.values(allShiftsTransfers).filter((shift) => shift.line === wals)
      );
    }
    if (
      typeSort === "wals" &&
      (lockMonth === true || lockWeek === true || lockDay === true)
    ) {
      const wals = "Wals " + valueSort;
      setAllShiftsTransfersSecondQuery(
        Object.values(allShiftsTransfersSort).filter(
          (shift) => shift.line === wals
        )
      );
    }

    // sorting by type and value (operators)
    if (
      typeSort === "operators" &&
      lockMonth === false &&
      lockWeek === false &&
      lockDay === false
    ) {
      const operator = valueSort;
      setAllShiftsTransfersSort(
        Object.values(allShiftsTransfers).filter(
          (shift) => shift.operator === operator
        )
      );
    }
    if (
      typeSort === "operators" &&
      (lockMonth === true || lockWeek === true || lockDay === true)
    ) {
      const operator = valueSort;
      setAllShiftsTransfersSecondQuery(
        Object.values(allShiftsTransfersSort).filter(
          (shift) => shift.operator === operator
        )
      );
    }

    // sorting by type and value (shifts)
    if (
      typeSort === "shifts" &&
      lockMonth === false &&
      lockWeek === false &&
      lockDay === false
    ) {
      const shiftValue = valueSort;
      setAllShiftsTransfersSort(
        Object.values(allShiftsTransfers).filter(
          (shift) => shift.shift === shiftValue
        )
      );
    }
    if (
      typeSort === "shifts" &&
      (lockMonth === true || lockWeek === true || lockDay === true)
    ) {
      const shiftValue = valueSort;
      setAllShiftsTransfersSecondQuery(
        Object.values(allShiftsTransfersSort).filter(
          (shift) => shift.shift === shiftValue
        )
      );
    }
  };

  const chooseSortOfShift = () => {
    const typeSort = sortType.current.value;
    if (typeSort === "shifts") {
      setHideShiftSorting(true);
    } else {
      setHideShiftSorting(false);
    }
  };

  const handleLockMonth = () => {
    setLockMonth(!lockMonth);
    if (lockMonth) {
      document.getElementById("sortMonth").disabled = false;
      document.getElementById("sortMonth").value = "";
      document.getElementById("sortType").value = "";
      document.getElementById("sortWeek").style.display = "flex";
      document.getElementById("sortWeekTitle").style.display = "flex";
      document.getElementById("sortWeekLockOpen").style.display = "flex";
      document.getElementById("sortDay").style.display = "flex";
      document.getElementById("sortDayTitle").style.display = "flex";
      document.getElementById("sortDayLockOpen").style.display = "flex";
    } else {
      document.getElementById("sortMonth").disabled = true;
      document.getElementById("sortWeek").style.display = "none";
      document.getElementById("sortWeekTitle").style.display = "none";
      document.getElementById("sortWeekLockOpen").style.display = "none";
      document.getElementById("sortDay").style.display = "none";
      document.getElementById("sortDayTitle").style.display = "none";
      document.getElementById("sortDayLockOpen").style.display = "none";
    }
  };

  const handleLockWeek = () => {
    setLockWeek(!lockWeek);
    if (lockWeek) {
      document.getElementById("sortWeek").disabled = false;
      document.getElementById("sortWeek").value = "";
      document.getElementById("sortType").value = "";
      document.getElementById("sortDay").style.display = "flex";
      document.getElementById("sortDayTitle").style.display = "flex";
      document.getElementById("sortDayLockOpen").style.display = "flex";
      document.getElementById("sortMonth").style.display = "flex";
      document.getElementById("sortMonthTitle").style.display = "flex";
      document.getElementById("sortMonthLockOpen").style.display = "flex";
    } else {
      document.getElementById("sortWeek").disabled = true;
      document.getElementById("sortDay").style.display = "none";
      document.getElementById("sortDayTitle").style.display = "none";
      document.getElementById("sortDayLockOpen").style.display = "none";
      document.getElementById("sortMonth").style.display = "none";
      document.getElementById("sortMonthTitle").style.display = "none";
      document.getElementById("sortMonthLockOpen").style.display = "none";
    }
  };

  const handleLockDay = () => {
    setLockDay(!lockDay);
    if (lockDay) {
      document.getElementById("sortDay").disabled = false;
      document.getElementById("sortDay").value = "";
      document.getElementById("sortType").value = "";
      document.getElementById("sortMonth").style.display = "flex";
      document.getElementById("sortMonthTitle").style.display = "flex";
      document.getElementById("sortMonthLockOpen").style.display = "flex";
      document.getElementById("sortWeek").style.display = "flex";
      document.getElementById("sortWeekTitle").style.display = "flex";
      document.getElementById("sortWeekLockOpen").style.display = "flex";
    } else {
      document.getElementById("sortDay").disabled = true;
      document.getElementById("sortMonth").style.display = "none";
      document.getElementById("sortMonthTitle").style.display = "none";
      document.getElementById("sortMonthLockOpen").style.display = "none";
      document.getElementById("sortWeek").style.display = "none";
      document.getElementById("sortWeekTitle").style.display = "none";
      document.getElementById("sortWeekLockOpen").style.display = "none";
    }
  };

  const oldToNew = (a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  };
  allShiftTransferItems = Object.values(allShiftTransferItems).sort(oldToNew);

  useEffect(() => {
    let interval;
    const whatShift = async () => {
      try {
        if (postsShiftTransfer) {
          Object.values(postsShiftTransfer)
            .slice(0, 1)
            .forEach((postsShiftTransfer) => {
              if (
                postsShiftTransfer.shift === shiftNow &&
                postsShiftTransfer.date === date.toLocaleDateString("nl-NL")
              ) {
                setHideShiftTransferForm(false);
              } else if (
                postsShiftTransfer.shift !== shiftNow &&
                postsShiftTransfer.date === date.toLocaleDateString("nl-NL")
              ) {
                setHideShiftTransferForm(true);
              }
            });
        }
      } catch (err) {
        console.error(err);
      }
    };
    let result = whatShift();
    if (!result) {
      interval = setInterval(whatShift, 10000);
    }
    interval = setInterval(whatShift, 10000);
    return () => clearInterval(interval);
  }, [postsShiftTransfer, shiftNow, date]);

  return (
    <>
      <Topbar />
      <div className="editShiftTransfer">
        <Sidebar />
        <div className="editShiftTransferRight">
          <div className="editShiftTransferRightContent">
            {!hideShiftTransferItemForm && (
              <>
                {user.role === 0 || user.isAdmin ? (
                  <button
                    className="editShiftTransferShowHideBtn"
                    onClick={() => handleHideShiftTransferSorting(true)}
                  >
                    {hideShiftTransferSorting
                      ? "Hide sorting panel"
                      : "Show sorting panel"}
                  </button>
                ) : null}
              </>
            )}
            {!hideShiftTransferSorting && (
              <>
                {user.role === 0 || user.isAdmin ? (
                  <button
                    className="editShiftTransferShowHideBtn"
                    onClick={() => handleHideShiftTransferItemForm(true)}
                  >
                    {hideShiftTransferItemForm
                      ? "Hide Edit or Add Items"
                      : "Show Edit or Add Items"}
                  </button>
                ) : null}
              </>
            )}

            {user.role === 0 || user.isAdmin ? (
              <>
                {hideShiftTransferSorting && (
                  <div className="editShiftTransferRightSorting editShiftTransferListWrapper">
                    <h2 className="editShiftTransferRightSortingTitle">
                      sort transfer shift
                    </h2>
                    <label className="editShiftTransferRightSortingLabel">
                      <p
                        className="editShiftTransferRightSortingText"
                        id="sortMonthTitle"
                      >
                        Sort by month
                      </p>
                      <input
                        className="editShiftTransferRightSortingInput"
                        type="month"
                        id="sortMonth"
                        ref={sortMonth}
                        onChange={() => handleSortMonth()}
                      />
                      <div
                        className="ActiveBtn"
                        onClick={() => handleLockMonth()}
                      >
                        {lockMonth ? (
                          <Lock />
                        ) : (
                          <LockOpen id="sortMonthLockOpen" />
                        )}
                      </div>
                    </label>
                    <label className="editShiftTransferRightSortingLabel">
                      <p
                        className="editShiftTransferRightSortingText"
                        id="sortWeekTitle"
                      >
                        Sort by week
                      </p>
                      <input
                        className="editShiftTransferRightSortingInput"
                        type="week"
                        id="sortWeek"
                        ref={sortWeek}
                        onChange={() => handleSortWeek()}
                        disabled={hideShiftTransferItemForm}
                      />
                      <div
                        className="ActiveBtn"
                        onClick={() => handleLockWeek()}
                      >
                        {lockWeek ? (
                          <Lock />
                        ) : (
                          <LockOpen id="sortWeekLockOpen" />
                        )}
                      </div>
                    </label>
                    <label className="editShiftTransferRightSortingLabel">
                      <p
                        className="editShiftTransferRightSortingText"
                        id="sortDayTitle"
                      >
                        Sort by day
                      </p>
                      <input
                        className="editShiftTransferRightSortingInput"
                        type="date"
                        id="sortDay"
                        ref={sortDay}
                        onChange={() => handleSortDay()}
                      />
                      <div
                        className="ActiveBtn"
                        onClick={() => handleLockDay()}
                      >
                        {lockDay ? <Lock /> : <LockOpen id="sortDayLockOpen" />}
                      </div>
                    </label>
                    <div className="sortingBox">
                      <select
                        className="editShiftTransferRightSortingInput"
                        defaultValue="clear"
                        ref={sortType}
                        onClick={() => chooseSortOfShift(sortType)}
                      >
                        <option
                          className="editShiftTransferRightSortingInput"
                          id="sortOperators"
                          value="operators"
                        >
                          Operator
                        </option>
                        <option
                          className="editShiftTransferRightSortingInput"
                          id="sortShifts"
                          value="shifts"
                        >
                          Shift
                        </option>
                        <option
                          className="editShiftTransferRightSortingInput"
                          id="sortWals"
                          value="wals"
                        >
                          Wals
                        </option>
                      </select>
                      {hideShiftSorting && (
                        <select
                          className="editShiftTransferRightSortingInput"
                          defaultValue={shiftNow}
                          ref={sortValue}
                        >
                          <option
                            className="editShiftTransferRightSortingInput"
                            id="morning"
                            value="Morning"
                          >
                            Morning
                          </option>
                          <option
                            className="editShiftTransferRightSortingInput"
                            id="afternoon"
                            value="Afternoon"
                          >
                            Afternoon
                          </option>
                          <option
                            className="editShiftTransferRightSortingInput"
                            id="day"
                            value="Day"
                          >
                            Day
                          </option>
                          <option
                            className="editShiftTransferRightSortingInput"
                            id="night"
                            value="Night"
                          >
                            Night
                          </option>
                        </select>
                      )}
                      {hideShiftSorting === false && (
                        <input
                          className="editShiftTransferRightSortingInput"
                          type="text"
                          id="sortType"
                          ref={sortValue}
                          style={{ width: "115px" }}
                          minLength={2}
                          maxLength={4}
                        />
                      )}
                      <button
                        className="editProfileButtonGet"
                        id="sortValue"
                        onClick={() => handleSortByTypeAndValue()}
                      >
                        Sort
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}

            {hideShiftTransferItemForm ? (
              <div className="editShiftTransferListWrapper">
                <div className="editShiftTransferItemsListContainer editShiftTransferScrollbar">
                  <ul className="editShiftTransferItemsList">
                    {Object.values(allShiftTransferItems).map((stItems, i) => {
                      return (
                        <li
                          className="editShiftTransferItemsItem"
                          key={stItems._id}
                        >
                          {user.role === 0 || user.isAdmin ? (
                            <div className="editShiftTransferItemDo">
                              <div className="editShiftTransferItemBtnsTop">
                                <p className="editShiftTransferItemNumber">
                                  {i + 1}
                                </p>
                                <div className="editShiftTransferItemBtns">
                                  <div className="editShiftTransferItemEdit">
                                    <Edit
                                      className="shiftTransferItemEdit"
                                      onClick={() => handleShTrItemGet(stItems)}
                                    />
                                  </div>
                                  <div
                                    className="editShiftTransferItemDelete"
                                    onClick={() =>
                                      handleShTrItemDelete(stItems)
                                    }
                                  >
                                    <HighlightOff className="shiftTransferItemDelete" />
                                  </div>
                                </div>
                              </div>
                              <div className="editShiftTransferItemContent">
                                <p className="editShiftTransferItemTitle">
                                  {stItems.title}
                                </p>
                              </div>
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                  {user.role === 0 || user.isAdmin ? (
                    <form
                      className="shiftTransferItemForm"
                      id="shiftTransferItemForm"
                      onSubmit={
                        getShTrItem._id === undefined
                          ? handleClickCreate
                          : handleClickEdit
                      }
                    >
                      <label className="shiftTransferItemItem" htmlFor="item">
                        <textarea
                          className="shiftTransferItemInput"
                          type="text"
                          placeholder="New text"
                          id="item"
                          ref={item}
                          defaultValue={"" || getShTrItem.title}
                          required
                        />
                      </label>
                      <div className="shiftTransferItemFormBtns">
                        {getShTrItem._id === undefined ? null : (
                          <CleaningServices
                            className="shiftTransferItemBtn"
                            onClick={() => handleShTrItemClear()}
                          />
                        )}
                        <button className="shiftTransferItemBtn" type="submin">
                          {getShTrItem._id === undefined ? "Create" : "Edit"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="editShiftTransferFormWrapper">
                  <ShiftTransfer2 />
                </div>
              </div>
            ) : (
              <></>
            )}

            {hideShiftTransferSorting ? (
              <>
                {lockMonth || lockWeek || lockDay ? (
                  <ul className="editShiftTransferPostsList">
                    {/* <li className="nMemoViev">No posts1</li> */}
                    {(user.role === 2 || user.role === 0) &&
                      Object.values(allShiftsTransfersSecondQuery).map((st) => (
                        <li className="nMemoViev" key={st._id}>
                          <PostShiftTransfer shiftTransfer={st} />
                        </li>
                      ))}
                  </ul>
                ) : (
                  <ul className="editShiftTransferPostsList">
                    {/* <li className="nMemoViev">No posts2</li> */}
                    {(user.role === 2 || user.role === 0) &&
                      Object.values(allShiftsTransfersSort).map((st) => (
                        <li className="nMemoViev" key={st._id}>
                          <PostShiftTransfer shiftTransfer={st} />
                        </li>
                      ))}
                  </ul>
                )}
              </>
            ) : (
              <ul className="editShiftTransferPostsList">
                {(user.role === 2 || user.role === 0) &&
                  Object.values(allShiftsTransfers).map((st) => (
                    <li className="nMemoViev" key={st._id}>
                      <PostShiftTransfer shiftTransfer={st} />
                    </li>
                  ))}
              </ul>
            )}

            {user.role === 3 && (
              <>
                <div className="editShiftTransferContainer">
                  {hideShiftTransferForm && (
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <button className="editShiftTransferShowHideBtn">
                        {" "}
                        Make shiftTransfer now
                      </button>
                    </Link>
                  )}
                  <ul>
                    {postsShiftTransfer.slice(0, expandMore).map((st) => (
                      <li key={st._id}>
                        <PostShiftTransfer key={st._id} shiftTransfer={st} />
                      </li>
                    ))}
                  </ul>
                  {postsShiftTransfer.length === expandMore ||
                  postsShiftTransfer.length < expandMore ? (
                    <></>
                  ) : (
                    <div
                      className="editBtn"
                      onClick={() => setExpandMore(expandMore + 7)}
                    >
                      <ExpandCircleDownOutlined />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {user.role === 2 || user.role === 0 ? (
          <RightbarMonitoring />
        ) : (
          <Rightbar />
        )}
      </div>
    </>
  );
}
