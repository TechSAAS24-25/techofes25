import React from "react";
import "./Textbox.css";

function Textbox(props) {
    return (
        <div className="cbox">
            <p className="cont">{props.content}</p>
        </div>
    );
}

export default Textbox;
