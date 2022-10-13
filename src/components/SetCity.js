import React, { Fragment, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import './SetCity.css';

const SetCity = props => {
    const cityInput = useRef(null);

    const handleCitySubmit = () => {
        props.onCitySubmit(cityInput.current.value);
    };

    return (
        <div className="search-stripe">
            <div className="input-wrapper">
                <input ref={cityInput} type="text" id="city" autoComplete="off"/>
            </div>
            <button onClick={handleCitySubmit}><FontAwesomeIcon icon={faMagnifyingGlass} className='search-ico' /></button>
        </div>
    );
};

export default SetCity;