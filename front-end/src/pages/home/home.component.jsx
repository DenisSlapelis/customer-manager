import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PersonType from '../../components/inputs/person-type/person-type.component';
import DocumentInput from '../../components/inputs/document/document-input.component';
import UFSelect from '../../components/selects/uf/uf-select.component';
import CitiesSelect from '../../components/selects/cities/cities.component';
import { Link } from 'react-router-dom';
import * as service from '../../services/customers.service';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ReCAPTCHA from "react-google-recaptcha";
import LinearProgress from '@material-ui/core/LinearProgress';

import './home.styles.css';

const HomePage = () => {
    const { register, handleSubmit } = useForm();
    const [personType, setPersonType] = useState("PF");
    const [customerData, setCustomerData] = useState({});
    const [foundCustomer, setFoundCustomer] = useState(false);
    const [selectedUF, setSelectedUF] = useState('');
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const reRef = useRef();

    const handlePersonTypeChange = (e) => {
        setPersonType(e.target.value);
        setFoundCustomer(false);
        setCustomerData({});
        setOpen(false);
    }

    const handleUFSelect = (event) => {
        const UF = event.target.value;
        setSelectedUF(UF);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSubmit = async ({ personType, UF, city, document }) => {
        setIsLoading(true);
        const captcha = await reRef.current.executeAsync();
        reRef.current.reset();

        service.getCustomersByDocumentUFCity(document, UF, city, personType, captcha)
            .then(response => {
                const result = response.data;
                const found = result.hasOwnProperty('name');
                if (!found) {
                    setAlertMessage("Pessoa não encontrada.");
                    setOpen(true);
                } else {
                    setCustomerData(result);
                    setFoundCustomer(found);
                }
                setIsLoading(false);
            }).catch(err => {
                const message = err.response.data.message ? err.response.data.message : "Erro ao realizar busca. Preencha todos os dados";
                setAlertMessage(message);
                setOpen(true);
                setIsLoading(false);
            });
    }

    return (
        <div>
            { isLoading ? <LinearProgress /> : ''}
            <div className="page-header">
                <h2>Lista pública de telefone</h2>
                <h3>Selecione o tipo de busca e informe os dados para encontrar o número de telefone</h3>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReCAPTCHA
                        sitekey="6LdQ9zgaAAAAAOPsEwRC2zbjD-PJvcJ1x202QJo0"
                        size="invisible"
                        ref={reRef}
                    />
                    <PersonType register={register} onChange={handlePersonTypeChange} />
                    <div>
                        <div className="form-label">
                            <b>Informe o {personType === "PF" ? "CPF" : "CNPJ"}:</b>
                        </div>
                        <DocumentInput className="form-item" register={register} personType={personType} />
                        <div className="form-item">
                            <UFSelect register={register} onChange={handleUFSelect} />
                            <CitiesSelect register={register} UF={selectedUF} />
                        </div>
                    </div>
                    {
                        foundCustomer ?
                            <div className="customerInfo form-item">
                                <b>{personType === "PF" ? "Nome" : "Razão Social"}:</b> {customerData.name} <br />
                                <b>{personType === "PF" ? "CPF" : "CNPJ"}:</b> {customerData.document} <br />
                                <b>UF:</b> {customerData.UF} <br />
                                <b>Cidade:</b> {customerData.city} <br />
                                <b>Telefone:</b> {customerData.phone}
                            </div> : ''
                    }
                    <input type="submit" value="Buscar" />
                </form>
            </div>
            <div className="page-footer">
                <Link to='/customer-manager'>
                    Gerenciar Pessoa
                </Link>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={"error"}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default HomePage;