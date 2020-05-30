import { apiUrl } from '../config';
import axios from 'axios';
// import toastService from './toastService'

function crudService (baseUrl) {
  const url = apiUrl + baseUrl;

  return {
    getAll: function () {
      return axios.get(url)
    },

    getFiltered: function (params) {
      return axios.post(`${url}/filter`, params)
    }
  }
}

export default crudService;