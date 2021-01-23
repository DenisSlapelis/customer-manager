import React, { useState, useEffect } from 'react';
import * as service from '../../../services/localizations.service';

const UFSelect = ({ register, onChange, defaultValue }) => {
    const [UFList, setUFList] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        setLoadingData(true);
        service.getUFList()
            .then(response => {
                setUFList(response.data);
                setLoadingData(false);
            });
    }, []);

    return (
        (loadingData) ?
            <select defaultValue={"default"} name="UF">
                <option value="default" disabled hidden>UF</option>
                <option disabled></option>
            </select>
            :
            <span>
                <select name="UF" defaultValue={defaultValue ? defaultValue : "default"} onChange={onChange} ref={register}>
                    <option value="default" disabled hidden>UF</option>
                    {UFList.map(UF =>
                        <option key={UF} value={UF}>{UF}</option>
                    )}
                </select>
            </span>
    )
}

export default UFSelect;