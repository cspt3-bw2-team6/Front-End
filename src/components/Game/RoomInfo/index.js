import React from 'react';
import "nes.css/css/nes.min.css";

function RoomInfo(props) {
    return(
        <div className="room-info-wrapper">
            <div className="nes-container is-rounded is-dark">
                <p>Cooldown: {props.cooldown}</p>
                <p>Exits: {props.exits.join(" ,")}</p>
                
            </div>
        </div>
    )
}

export default RoomInfo;