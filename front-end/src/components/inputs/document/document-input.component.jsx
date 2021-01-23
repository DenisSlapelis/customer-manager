import React from 'react';

const DocumentInput = ({ register, personType, defaultValue, className }) => {
    return (
        <input
            type="text"
            placeholder={`Informe o ${personType === "PF" ? "CPF" : "CNPJ"}`}
            defaultValue={defaultValue}
            name="document"
            className={className}
            ref={register}
        />
    )
}

export default DocumentInput;