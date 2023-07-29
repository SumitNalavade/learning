import { useState } from "react";
import { Link } from "react-router-dom";

import "./join.css"

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>

                <div>
                    <input value={name} type="text" placeholder="Name" className="joinInput" onChange={(evt) => setName(evt.target.value)} />
                    <input value={room} type="text" placeholder="Room" className="joinInput mt-20" onChange={(evt) => setRoom(evt.target.value)} />
                    
                    <Link to={`/chat`} state={{ name, room }} onClick={(evt) => (!name || !room) ? evt.preventDefault() : null}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Join;