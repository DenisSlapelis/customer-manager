import React from 'react';

const UFSelect = ({ register, UFList, onChange }) => {
    return (
        <select name="UF" defaultValue={"default"} onChange={onChange} ref={register}>
            <option value="default" disabled hidden>UF</option>
            {UFList.map(uf =>
                <option key={uf} value={uf}>{uf}</option>
            )}
        </select>
    )
}

export default UFSelect;