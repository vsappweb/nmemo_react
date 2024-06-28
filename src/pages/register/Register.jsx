import { useRef, useState } from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom"  //import {useHistory} from "react-router"
import { Link } from "react-router-dom"

export default function Register() {
    const API = process.env.REACT_APP_SERVER_API
    const email = useRef();
    const personnelnumber = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const role = useRef();
    const admin = useRef();
    // const [val, setVal] = useState(false); //initializes checkbox to false 
    // const label = "Is Admin "

    // const Checkbox = (props) => {
    //     return <label>
    //         {props.label}
    //         <input type="checkbox" name={props.name} value={props.val} onChange={() => { props.setValue(!props.val) }} />
    //     </label>
    // }

    const history = useNavigate(); //useHistory()


    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                personnelnumber: personnelnumber.current.value,
                username: "",
                email: email.current.value,
                password: password.current.value,
                role: role.current.value
            };
            try {
                console.log("test start")
                console.log(user)
                await axios.post(`${API}/auth/register`, user);
                console.log("test end")
                //history("/login")  //history.push("/login")
            } catch (err) {
                console.log(err)
            }
        }
    };



    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginCenter">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input className="loginInput" ref={personnelnumber} placeholder="Personnelnumber" type="text" />
                        <input className="loginInput" ref={email} placeholder="Email" type="email" />
                        <input className="loginInput" ref={password} placeholder="Password" type="password" minLength="6" />
                        <input className="loginInput" ref={passwordAgain} placeholder="Password Again" type="password" minLength="6" />
                        <fieldset className="loginBorder">
                            <legend className="loginTitle">Select a group:</legend>
                            <select className="loginInput" ref={role}>
                                <option className="loginInput" value="1">Operator</option>
                                <option className="loginInput" value="4">Logistics</option>
                                <option className="loginInput" value="5">Mechanic</option>
                            </select>
                        </fieldset>
                        <button className="loginButton" type="Submit">Sign Up</button>
                        <Link to={`/login`} style={{ textDecoration: "none" }}>
                            <button className="loginRegisterButton">Log into Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
