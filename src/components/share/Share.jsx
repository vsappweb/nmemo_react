import { useContext, useRef, useState } from "react";
import "./share.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { PermMedia, EmojiEmotions, Cancel, Send } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import Picker from "emoji-picker-react"

export default function Share() {
    const API = process.env.REACT_APP_SERVER_API
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };
        if (file) {
            const data = new FormData();
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const fileName = uniqueSuffix + file.name;
            console.log(fileName)
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post(`${API}/upload`, data);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }


        try {
            await axios.post(`${API}/posts`, newPost);
            window.location.reload();
        } catch (err) {

        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <div className="avatarUser">
                        <AvatarUser user={user} />
                    </div>
                    <input className="shareInput" type="text" placeholder={"Please leave information " + user.username || user.personnelnumber + "?"} ref={desc} value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="shareImg" />
                        <Cancel className="shareCancel" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia className="shareIcon" htmlColor="tomato" />
                            <span className="shareOptionText">Photo</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <div className="shareEmoji">
                                <EmojiEmotions className="shareIcon" htmlColor="goldenrod" onClick={() => setOpen((prev) => !prev)} />
                                <span className="shareOptionText" onClick={() => setOpen((prev) => !prev)}>Smile</span>
                            </div>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share
                        <Send />
                    </button>
                </form>
                <div className="shareEmojiPicker">
                    {open && (<Picker suggestedEmojisMode={["recent"]} style={{ width: "100%" }} reactionsDefaultOpen={true} searchDisabled={true} onEmojiClick={handleEmoji} />)}
                </div>
            </div>
        </div>
    )
}
