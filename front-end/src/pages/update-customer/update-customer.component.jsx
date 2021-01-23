import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PersonType from '../../components/inputs/person-type/person-type.component';
import DocumentInput from '../../components/inputs/document/document-input.component';
import UFSelect from '../../components/selects/uf/uf-select.component';
import CitiesSelect from '../../components/selects/cities/cities.component';
import { Link, useParams } from 'react-router-dom';
import * as service from '../../services/customers.service';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const UpdateCustomerPage = () => {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [personType, setPersonType] = useState("PF");
    const [customerData, setCustomerData] = useState({});
    const [selectedUF, setSelectedUF] = useState('');
    const [updated, setUpdated] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        setOpen(false);
        service.getCustomersById(id)
            .then(response => {
                setCustomerData(response.data);
                setSelectedUF(response.data.UF);
            }).catch(err => {
                console.log(err.response.data)
                const message = err.response.data.message ? err.response.data.message : "Erro ao atualizar dados";
                setAlertMessage(message);
                setOpen(true);
            });
    }, [id]);

    const handlePersonTypeChange = (e) => {
        setPersonType(e.target.value);
    }

    const handleUFSelect = (event) => {
        const UF = event.target.value;
        setSelectedUF(UF);
    }

    const onSubmit = ({ personType, name, document, UF, city, birthDate, phone }) => {
        setOpen(false);
        setUpdated(false);
        service.updateCustomer({ id, personType, name, document, UF, city, birthDate, phone })
            .then(() => {
                setAlertMessage("Pessoa atualizada com sucesso.");
                setUpdated(true);
                setOpen(true);
            })
            .catch(err => {
                console.log(err.response.data)
                const message = err.response.data.message ? err.response.data.message : "Erro ao atualizar dados";
                setAlertMessage(message);
                setOpen(true);
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
            <div>
                <h2>Gerenciando Pessoas</h2>
                <h3>Alteração de Pessoa Física/Jurídica</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PersonType register={register} onChange={handlePersonTypeChange} />
                    <div>
                        <div>
                            <b>Informe o Nome:</b>
                        </div>
                        <input type="text" name="name" defaultValue={customerData.name} placeholder={"Informe o Nome"} ref={register} />
                        <div>
                            <b>Informe o {personType === "PF" ? "CPF" : "CNPJ"}:</b>
                        </div>
                        <DocumentInput register={register} personType={personType} defaultValue={customerData.document} />
                        <div>
                            <UFSelect register={register} onChange={handleUFSelect} defaultValue={customerData.UF} />
                        </div>
                        <div>
                            <CitiesSelect register={register} UF={selectedUF} />
                        </div>
                        <div>
                            <b>Informe o Telefone:</b>
                        </div>
                        <input type="text" name="phone" defaultValue={customerData.phone} placeholder={"Informe a Telefone"} ref={register} />
                    </div>
                    <input type="submit" value="Salvar" />
                </form>
                <Link to='/customer-manager'>
                    Gerenciar Pessoa
                </Link>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={updated ? "success" : "error"}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default UpdateCustomerPage;