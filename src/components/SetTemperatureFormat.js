import React, { useRef } from "react";

import './SetTemperatureFormat.css';

const SetTemperatureFormat = props => {

    let fahrenheit = useRef(null);
    let celsius = useRef(null);

    const handleFormatChange = () => {
        if(props.temperatureFormat === 'fahrenheit') {
            props.onFormatSubmit('celsius');
            fahrenheit.current.className = "";
            celsius.current.className = "show";
        } else {
            props.onFormatSubmit('fahrenheit');
            fahrenheit.current.className = "show";
            celsius.current.className = "";
        }
    };

    return (
        <div className="rect-button format" onClick={handleFormatChange}>
            <span ref={fahrenheit} className="show">F</span>
            <span ref={celsius}>C</span>
        </div>
    );
};

export default SetTemperatureFormat;