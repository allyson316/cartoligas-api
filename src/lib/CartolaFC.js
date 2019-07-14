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
      const time = await this.request.get(url);
      return time;
    } catch (error) {
      return error;
    }
  }

  async buscarRodadas() {
    try {
      const url = `/rodadas`;
      const rodadas = await this.request.get(url);
      return rodadas;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new CartolaFC();
