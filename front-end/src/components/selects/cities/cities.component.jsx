import React, { useState, useEffect } from 'react';
import * as service from '../../../services/localizations.service';

const CitiesSelect = ({ register, UF, defaultValue }) => {
    const [cityList, setCityList] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (UF) {
            setLoadingData(true);
            service.getCityListByUF(UF)
                .then(response => {
                    setCityList(response.data);
                    setLoadingData(false);
                });
        }
    }, [UF]);

    return (
        (loadingData) ?
            <span>
                <select defaultValue={defaultValue ? defaultValue : "default"} name="city">
                    <option value="default" disabled hidden>Cidade</option>
                    <option disabled></option>
                </select>
            </span> :
            <select name="city" defaultValue={defaultValue} ref={register}>
                <option value="default" disabled hidden>Cidade</option>
                {cityList.map(city =>
                    <option key={city} value={city}>{city}</option>
                )}
            </select>
    )
}

export default CitiesSelect;