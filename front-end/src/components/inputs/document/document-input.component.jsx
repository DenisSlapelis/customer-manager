import React from 'react';

const DocumentInput = ({ register, personType, defaultValue }) => {
    return (
        <input
            type="text"
            placeholder={`Informe o ${personType === "PF" ? "CPF" : "CNPJ"}`}
            defaultValue={defaultValue}
            name="document"
            ref={register}
        />
    )
}

export default DocumentInput;