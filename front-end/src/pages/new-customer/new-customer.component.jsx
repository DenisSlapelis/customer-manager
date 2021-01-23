import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import PersonType from '../../components/inputs/person-type/person-type.component';
import DocumentInput from '../../components/inputs/document/document-input.component';
import UFSelect from '../../components/selects/uf/uf-select.component';
import CitiesSelect from '../../components/selects/cities/cities.component';
import { Link } from 'react-router-dom';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import * as service from '../../services/customers.service';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import ReCAPTCHA from "react-google-recaptcha";

const NewCustomerPage = () => {
    const { register, handleSubmit } = useForm();
    const [personType, setPersonType] = useState("PF");
    const [selectedUF, setSelectedUF] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [created, setCreated] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const reRef = useRef();

    const handlePersonTypeChange = (e) => {
        setPersonType(e.target.value);
    }

    const handleUFSelect = (event) => {
        const UF = event.target.value;
        setSelectedUF(UF);
    }

    const handleDatePicker = (date) => {
        setStartDate(date);
        setSelectedDate(date);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSubmit = async ({ personType, name, document, UF, city, birthDate, phone }) => {
        const captcha = await reRef.current.executeAsync();
        reRef.current.reset();

        setOpen(false);
        setCreated(false);
        service.addNewCustomer({ captcha, personType, name, document, UF, city, birthDate, phone })
            .then(() => {
                setCreated(true);
                setAlertMessage("Pessoa cadastrada com sucesso.");
                setOpen(true);
            })
            .catch(err => {
                console.log(err.response.data)
                const message = err.response.data.message ? err.response.data.message : "Erro ao inserir dados";
                setAlertMessage(message);
                setOpen(true);
            });
    }

    return (
        <div>
            <div>
                <h2>Gerenciando Pessoas</h2>
                <h3>Criação de Pessoa Física/Jurídica</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReCAPTCHA
                        sitekey="6LdQ9zgaAAAAAOPsEwRC2zbjD-PJvcJ1x202QJo0"
                        size="invisible"
                        ref={reRef}
                    />
                    <PersonType register={register} onChange={handlePersonTypeChange} />
                    <div>
                        <div>
                            <b>Informe {personType === "PF" ? "o Nome" : "a Razão Social"}:</b>
                        </div>
                        <input type="text" name="name" placeholder={`Informe ${personType === "PF" ? "o Nome" : "a Razão Social"}`} ref={register} />
                        <div>
                            <b>Informe o {personType === "PF" ? "CPF" : "CNPJ"}:</b>
                        </div>
                        <DocumentInput register={register} personType={personType} />
                        <div>
                            <UFSelect register={register} onChange={handleUFSelect} />
                        </div>
                        <div>
                            <CitiesSelect register={register} UF={selectedUF} />
                        </div>
                        <div>
                            <b>Data de Nascimento:</b>
                        </div>
                        <input type="text" name="birthDate" defaultValue={selectedDate ? selectedDate.toLocaleDateString() : ""} placeholder={"Informe a Data de Nascimento"} ref={register} />
                        <DatePicker
                            selected={startDate}
                            onChange={handleDatePicker}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            customInput={<CalendarTodayTwoToneIcon />}
                        />
                        <div>
                            <b>Informe o Telefone:</b>
                        </div>
                        <input type="text" name="phone" placeholder={"Informe a Telefone"} ref={register} />
                    </div>
                    <input type="submit" value="Salvar" />
                </form>
                <Link to='/customer-manager'>
                    Gerenciar Pessoa
            </Link>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={created ? "success" : "error"}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default NewCustomerPage;