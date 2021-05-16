import axios from 'axios';
import { getDataFromLocalStorage } from '../utils/localStorage';

export async function request(url = '', method = '', data = {}) {
    const config:any = {};

    const token = getDataFromLocalStorage();

    if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        };
      }

    // eslint-disable-next-line no-return-await
    return await axios({
        url,
        method,
        data,
        ...config,
    });
}

export default request;
