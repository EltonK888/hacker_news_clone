import React from 'react'
import Switch from "react-switch"

/* Switch to change between dark mode and light mode themes */
export default function DarkModeSwitch(props) {
    return (
        <React.Fragment>
            <label htmlFor="material-switch">
            <span style={{fontSize: "30px", color: props.darkMode ? "#999" : "#e0dd2a"}}>☼</span>
            <Switch
                checked={props.darkMode}
                onChange={props.themeChange}
                onColor="#6a6acd"
                onHandleColor="#2693e6"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={10}
                width={48}
                className="react-switch"
                id="material-switch"
            />
            <span style={{fontSize: "30px", color: props.darkMode ? "slateblue" : "black"}}>☽</span>
            </label>
        </React.Fragment>
    )
}
