import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PersonType from '../../components/inputs/person-type/person-type.component';
import DocumentInput from '../../components/inputs/document/document-input.component';
import UFSelect from '../../components/selects/uf/uf-select.component';
import CitiesSelect from '../../components/selects/cities/cities.component';

import './home.styles.css';

const HomePage = () => {
    const { register, handleSubmit } = useForm();
    const [personType, setPersonType] = useState("PF");
    const [UFList, setUFList] = useState([]);
    const [localizationsData, setLocalizationsData] = useState({});
    const [cityList, setCityList] = useState([]);
    const [customerData, setCustomerData] = useState({});
    const [foundUser, setFoundUser] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3002/api/v1/localizations')
            .then(response => response.json())
            .then(response => {
                setLocalizationsData(response);
                setUFList(response.UF);
            });
    }, []);

    const handlePersonTypeChange = (e) => {
        setPersonType(e.target.value);
    }

    const getCitiesByUF = (uf) => {
        const result = localizationsData.cities.filter(item => {
            return item.UF === uf;
        });
        setCityList(result);
    }

    const handleUFSelect = (event) => {
        const UF = event.target.value;
        getCitiesByUF(UF);
    }

    const onSubmit = ({ personType, UF, city, document }) => {
        fetch(`http://localhost:3002/api/v1/customers/${document}/${UF}/${city}?type=${personType}`)
            .then(response => {
                if (response.status !== 200)
                    return false;

                return response.json()
            })
            .then(response => {
                if (!response) {
                    setFoundUser(false);
                    return;
                }

                setFoundUser(true);
                setCustomerData(response);
            });
    }

    return (
        <div className='homepage'>
            <div>
                <h2>Lista pública de telefone</h2>
                <h3>Selecione o tipo de busca e informe os dados para encontrar o número de telefone</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PersonType register={register} onChange={handlePersonTypeChange} />
                    <div>
                        <div>
                            <b>Informe o {personType === "PF" ? "CPF" : "CNPJ"}:</b>
                        </div>
                        <DocumentInput register={register} personType={personType} />
                        <div>
                            <UFSelect register={register} UFList={UFList} onChange={handleUFSelect} />
                            <CitiesSelect register={register} cityList={cityList} />
                        </div>
                    </div>
                    <input type="submit" value="Buscar" />
                </form>
                {
                    foundUser ?
                        <div>
                            <b>Nome:</b> {customerData.name}
                            <b>{personType === "PF" ? "CPF" : "CNPJ"}:</b> {customerData.document}
                            <b>UF:</b> {customerData.UF}
                            <b>Cidade:</b> {customerData.city}
                            <b>Telefone:</b> {customerData.phone}
                        </div> : ''
                }
            </div>
        </div>
    )
}

export default HomePage;