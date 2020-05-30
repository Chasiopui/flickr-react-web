import { apiUrl } from '../config';
import axios from 'axios';

function crudService (baseUrl) {
  const url = apiUrl + baseUrl;

  return {
    getAll: function () {
      return axios.get(url)
    },

    getFiltered: function (params) {
      return axios.get(`${url}`, params)
    }
  }
}

export default crudService;