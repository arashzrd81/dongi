import React, { useState } from "react";
import Menu from "../menu/Menu";
import "./Bars.css";


const Bars = ({page}) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <i className="fa-solid fa-bars" onClick={() => setShowMenu(true)}></i>
            {
                showMenu &&
                <Menu setShowMenu={setShowMenu} page={page} />
            }
        </>
    );
};


export default Bars;