import React, { useRef } from "react";

import './SetTimestamp.css';

const SetTimestamp = props => {

    let dayTimestamp = useRef(null);
    let hourTimestamp = useRef(null);

    const handleTimestampChange = () => {
        if(props.timestamp === 'days') {
            props.onTimestampSubmit('hours');
            dayTimestamp.current.className = "";
            hourTimestamp.current.className = "show";
        } else {
            props.onTimestampSubmit('days');
            dayTimestamp.current.className = "show";
            hourTimestamp.current.className = "";
        }
    };

    return (
        <div className="rect-button" onClick={handleTimestampChange}>
            <span ref={dayTimestamp} className="show">D</span>
            <span ref={hourTimestamp}>H</span>
        </div>
    );
};

export default SetTimestamp;