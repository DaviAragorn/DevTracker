import React from 'react' 

import './styles.scss'

function InputBlock(props){
    return (
        <div className={props.className.concat(props.value? props.validation(props.value)? '-valid':'-invalid':"")}>
            <label htmlFor={props.name}>{props.title}</label>
            <input name={props.name}
            id={props.name}
            valid={props.validation(props.value)}
            type={props.type}
            required={props.required}
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={e=> props.updateValue(e.target.value)}/> 
          </div>
    )
}

export default InputBlock