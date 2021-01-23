import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PersonType from '../../components/inputs/person-type/person-type.component';
import DocumentInput from '../../components/inputs/document/document-input.component';
import UFSelect from '../../components/selects/uf/uf-select.component';
import CitiesSelect from '../../components/selects/cities/cities.component';
import { Link, useParams } from 'react-router-dom';
import * as service from '../../services/customers.service';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import ReCAPTCHA from "react-google-recaptcha";

const UpdateCustomerPage = () => {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [personType, setPersonType] = useState("PF");
    const [customerData, setCustomerData] = useState({});
    const [selectedUF, setSelectedUF] = useState('');
    const [updated, setUpdated] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const reRef = useRef();

    useEffect(() => {
        setIsLoading(true);
        reRef.current.executeAsync().then(captcha => {
            reRef.current.reset();
            setOpen(false);
            service.getCustomersById(captcha, id)
                .then(response => {
                    setPersonType(response.data.personType);
                    setCustomerData(response.data);
                    setSelectedUF(response.data.UF);
                    setIsLoading(false);
                }).catch(err => {
                    console.log(err.response.data)
                    const message = err.response.data.message ? err.response.data.message : "Erro ao atualizar dados";
                    setAlertMessage(message);
                    setOpen(true);
                    setIsLoading(false);
                });
        }).catch(err => {
            setIsLoading(false);
            console.log('captcha error: ', err)
        }
        );
    }, [id]);

    const handlePersonTypeChange = (e) => {
        setPersonType(e.target.value);
    }

    const handleUFSelect = (event) => {
        const UF = event.target.value;
        setSelectedUF(UF);
    }

    const onSubmit = async ({ personType, name, document, UF, city, birthDate, phone }) => {
        setIsLoading(true);
        const captcha = await reRef.current.executeAsync();
        reRef.current.reset();
        setOpen(false);
        setUpdated(false);
        service.updateCustomer({ captcha, id, personType, name, document, UF, city, birthDate, phone })
            .then(() => {
                setAlertMessage("Pessoa atualizada com sucesso.");
                setUpdated(true);
                setOpen(true);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.response.data)
                const message = err.response.data.message ? err.response.data.message : "Erro ao atualizar dados";
                setAlertMessage(message);
                setOpen(true);
                setIsLoading(false);
            });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div>
            { isLoading ? <LinearProgress /> : ''}
            <div className="page-header">
                <h2>Gerenciando Pessoas</h2>
                <h3>Alteração de Pessoa Física/Jurídica</h3>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReCAPTCHA
                        sitekey="6LdQ9zgaAAAAAOPsEwRC2zbjD-PJvcJ1x202QJo0"
                        size="invisible"
                        ref={reRef}
                    />
                    {isLoading ?
                        <PersonType personType={"PF"} register={register} onChange={handlePersonTypeChange} /> :
                        <span>
                            <PersonType personType={personType} register={register} onChange={handlePersonTypeChange} />
                        </span>
                    }
                    <div>
                        <div className="form-label">
                            <b>Informe {personType === "PF" ? "o Nome" : "a Razão Social"}:</b>
                        </div>
                        <input type="text" name="name" className="form-item" defaultValue={customerData.name} placeholder={`Informe ${personType === "PF" ? "o Nome" : "a Razão Social"}`} ref={register} />
                        <div className="form-label">
                            <b>Informe o {personType === "PF" ? "CPF" : "CNPJ"}:</b>
                        </div>
                        <DocumentInput register={register} className="form-item" personType={personType} defaultValue={customerData.document} />
                        <div className="form-label">
                            <b>UF:</b>
                        </div>
                        <div className="form-item">
                            <UFSelect register={register} onChange={handleUFSelect} defaultValue={customerData.UF} />
                        </div>
                        <div className="form-label">
                            <b>Cidade:</b>
                        </div>
                        <div className="form-item">
                            <CitiesSelect register={register} UF={selectedUF} />
                        </div>
                        <div className="form-label">
                            <b>Informe o Telefone:</b>
                        </div>
                        <input type="text" name="phone" className="form-item" defaultValue={customerData.phone} placeholder={"Informe a Telefone"} ref={register} />
                    </div>
                    <input type="submit" value="Salvar" />
                </form>
            </div>
            <div className="page-footer">
                <Link to='/customer-manager'>
                    Voltar a Tela de Gerenciar Pessoas
                </Link>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={updated ? "success" : "error"}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UpdateCustomerPage;