import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './customer-manager.styles.css';
import * as service from '../../services/customers.service';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ReCAPTCHA from "react-google-recaptcha";

const CustomerManagerPage = () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [customerList, setCustomerList] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [refreshList, setRefreshList] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const reRef = useRef();

    useEffect(() => {
        reRef.current.executeAsync().then(captcha => {
            reRef.current.reset();

            setOpen(false);
            setLoadingData(true);
            service.getCustomersList(captcha, page, itemsPerPage)
                .then(response => {
                    const result = response.data;
                    setCustomerList(result.data);
                    setPaginationInfo({
                        totalItems: result.totalItems,
                        totalPages: result.totalPages,
                    });
                })
                .catch(err => {
                    console.log(err.response.data)
                    const message = err.response.data.message ? err.response.data.message : "Erro ao carregar dados";
                    setAlertMessage(message);
                    setOpen(true);
                });
            setLoadingData(false);
        }).catch(err => console.log('captcha error: ', err));
    }, [page, itemsPerPage, refreshList]);


    const handleRemoveClick = async (id) => {
        const captcha = await reRef.current.executeAsync();
        reRef.current.reset();

        setOpen(false);
        setRemoved(false);
        service.removeCustomer(captcha, id).then(() => {
            setRemoved(true);
            setAlertMessage("Pessoa removida com sucesso.");
            setOpen(true);
            setRefreshList(!refreshList);
        }).catch(err => {
            console.log(err.response.data)
            const message = err.response.data.message ? err.response.data.message : "Erro ao excluir pessoa";
            setAlertMessage(message);
            setOpen(true);
        });
    }

    const handleItemsPerPage = (event) => {
        setItemsPerPage(event.target.value);
    }

    const handlePagination = (personType) => {
        const personTypeMap = {
            'first': 1,
            'last': paginationInfo.totalPages,
            'next': page + 1,
            'previous': page - 1,
        };

        setPage(personTypeMap[personType]);
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
                <h2>Gerenciando Pessoas Físicas e Jurídicas</h2>
            </div>
            <div>
                <Link to='/new-customer'>Criar Nova Pessoa</Link>
            </div>
            <ReCAPTCHA
                sitekey="6LdQ9zgaAAAAAOPsEwRC2zbjD-PJvcJ1x202QJo0"
                size="invisible"
                ref={reRef}
            />
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Nome/Razão Social</th>
                        <th>CPF/CNPJ</th>
                        <th>Telefone</th>
                        <th>Cidade</th>
                        <th><center>Ações</center></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loadingData ?
                            <tr>
                                <td colSpan="6"><center>Carregando dados...</center></td>
                            </tr> :
                            !loadingData && customerList.length === 0 ?
                                <tr>
                                    <td colSpan="6"><center>Nenhum dado disponível</center></td>
                                </tr> :
                                customerList.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.personType}</td>
                                        <td>{item.name}</td>
                                        <td>{item.document}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.city}</td>
                                        <td>
                                            <Link
                                                to={{
                                                    pathname: `/update-customer/${item.id}`,
                                                }}
                                            >
                                                <EditIcon color="primary" />
                                            </Link>
                                            <DeleteIcon color="secondary" onClick={() => handleRemoveClick(item.id)} />
                                        </td>
                                    </tr>
                                ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            Itens por página:
                            <select name="itemsPerPage" onChange={handleItemsPerPage}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </td>

                        <td colSpan="4">
                            <center>
                                <span onClick={() => handlePagination('first')}><b>{page > 1 ? "<< " : ""}</b></span>
                                <span onClick={() => handlePagination('previous')}>{page > 1 ? "< " : ""}</span>
                                {paginationInfo.totalPages === 0 ? 0 : page} de {paginationInfo.totalPages}
                                <span onClick={() => handlePagination('next')}>{page < paginationInfo.totalPages ? " >" : ""}</span>
                                <span onClick={() => handlePagination('last')}><b>{page < paginationInfo.totalPages ? " >>" : ""}</b></span>
                            </center>
                        </td>
                        <td>
                            Total de itens: {paginationInfo.totalItems}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div>
                <Link to='/'>
                    Voltar a tela de Pesquisa de Telefone
                </Link>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={removed ? "success" : "error"}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CustomerManagerPage;