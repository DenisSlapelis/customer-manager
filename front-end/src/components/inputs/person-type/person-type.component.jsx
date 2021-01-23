import React from 'react';
import './person-type.styles.css';

const PersonType = ({ personType, onChange, register }) => {
    return (
        <div className="PersonType">
            <input type="radio" name="personType" id="PF" value="PF" defaultChecked={personType === "PF" || !personType} onChange={onChange} ref={register} />
            <label htmlFor="PF">Pessoa Física</label>
            <input type="radio" name="personType" id="PJ" value="PJ" defaultChecked={personType === "PJ"} onChange={onChange} ref={register} />
            <label htmlFor="PJ">Pessoa Jurídica</label>
        </div>
    )
}

export default PersonType;