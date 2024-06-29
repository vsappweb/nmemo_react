import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom"

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch } = useContext(AuthContext)
    //const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
        //navigate("/")
    };

    console.log(user)
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginCenter">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input className="loginInput" type="email" required placeholder="Your Login" ref={email} />
                        <input className="loginInput" type="password" required minLength="6" placeholder="Password" ref={password} />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="25px" /> : "Log In"}</button>
                        {/* <span className="loginForgot">Forgot Password?</span> */}
                        <Link to={`/register`} style={{ textDecoration: "none" }}>
                            <button className="loginRegisterButton">{isFetching ? <CircularProgress color="inherit" size="25px" /> : "Create a New Account"}</button>
                        </Link>
                    </form>

                </div>
            </div>
        </div>
    )
}