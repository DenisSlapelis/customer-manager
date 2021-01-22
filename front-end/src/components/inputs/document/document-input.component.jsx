import React from 'react';

const DocumentInput = ({ register, personType }) => {
    return (
        <input
            type="text"
            placeholder={`Informe o ${personType === "PF" ? "CPF" : "CNPJ"}`}
            name="document"
            ref={register}
        />
    )
}

export default DocumentInput;