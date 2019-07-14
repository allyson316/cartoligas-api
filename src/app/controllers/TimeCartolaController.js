const CartolaFc = require('../../lib/CartolaFC');

class TimeCartolaController {
  async index(req, res) {
    // busco o time na base do cartola
    const { time } = req.query;
    const timeCartola = await CartolaFc.buscarTime(time);

    return res.json(timeCartola.data);
  }
}

module.exports = new TimeCartolaController();
