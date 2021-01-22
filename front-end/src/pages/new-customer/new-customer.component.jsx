import React from 'react';

const NewCustomerPage = (props) => {
    return (
        <div>
            <div>
                <b>Informe o Nome:</b>
            </div>
            <input type="text" placeholder="Informe o Nome" name="name" ref={register} />
        </div>
    )
}

export default NewCustomerPage;