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
            <div>
                <p>teste 1</p>
                <select defaultValue={"default"} name="UF">
                    <option value="default" disabled hidden>UF</option>
                    <option disabled></option>
                </select>
            </div>
            :
            (!loadingData && !defaultValue) ?
                <div>
                    <select name="UF" defaultValue={"default"} onChange={onChange} ref={register}>
                        <option value="default" disabled hidden>UF</option>
                        {UFList.map(UF =>
                            <option key={UF} value={UF}>{UF}</option>
                        )}
                    </select>
                </div> :
                <span>
                    <select name="UF" defaultValue={defaultValue} onChange={onChange} ref={register}>
                        {UFList.map(UF =>
                            <option key={UF} value={UF}>{UF}</option>
                        )}
                    </select>
                </span>
    )
}

export default UFSelect;