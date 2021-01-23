
import axios from 'axios';

export const getUFList = async () => {
    return axios.get(`http://localhost:3002/api/v1/localizations`);
}

export const getCityListByUF = async (UF) => {
    return axios.get(`http://localhost:3002/api/v1/localizations/${UF}`);
}