const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const api = axios.create({
  baseURL: 'https://api.pagar.me/core/v5',
  withCredentials: true
});
const api_key = process.env.API_KEY_PAGARME;

module.exports = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF95WlJ3UnpxdDlqSGwwd3piOkJyZWFraW5nMWEyYi4='
      },
      data,
    });
    return { error: false, data: response.data };
  } catch (err) {
    return {
      error: true,
      message: `ERRORS ${JSON.stringify(err.response.data)}`,
    };
  }
};
