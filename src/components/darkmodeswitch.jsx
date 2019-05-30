import React from 'react'

export default function DarkModeSwitch(props) {

    if (props.darkMode) {
        return (
            <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={props.themeChange} checked/>
                    <label className="custom-control-label" htmlFor="customSwitch1"/>
                <span style={props.darkMode ? {color: "slateblue"} : {color : "black"}}>☽</span>
            </div>
        )
    } else {
        return (
            <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={props.themeChange}/>
                    <label className="custom-control-label" htmlFor="customSwitch1"/>
                <span style={props.darkMode ? {color: "slateblue"} : {color : "black"}}>☽</span>
            </div>
        )
    }
}
