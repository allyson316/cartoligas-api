require('dotenv/config');
const axios = require('axios');

class CartolaFC {
  constructor() {
    this.request = axios.create({
      baseURL: process.env.URL_CARTOLA,
    });
  }

  async buscarTime(nomeTime) {
    try {
      const url = `/times?q=${nomeTime}`;
      const timeResult = await this.request.get(url);
      return timeResult;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new CartolaFC();
