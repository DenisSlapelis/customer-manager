import React from 'react';

const CitiesSelect = ({ register, cityList }) => {
    return (
        <select name="city" defaultValue={"default"} ref={register}>
            <option value="default" disabled hidden>Cidade</option>
            {cityList.map(item =>
                <option key={item.city} value={item.city}>{item.city}</option>
            )}
        </select>
    )
}

export default CitiesSelect;