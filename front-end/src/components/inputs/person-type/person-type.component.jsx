import React from 'react';
import './person-type.styles.css';

const PersonType = (props) => {
    return (
        <div className="PersonType">
            <input type="radio" name="personType" id="PF" value="PF" defaultChecked={true} onChange={props.onChange} ref={props.register} />
            <label htmlFor="PF">Pessoa Física</label>
            <input type="radio" name="personType" id="PJ" value="PJ" onChange={props.onChange} ref={props.register} />
            <label htmlFor="PJ">Pessoa Jurídica</label>
        </div>
    )
}

export default PersonType;