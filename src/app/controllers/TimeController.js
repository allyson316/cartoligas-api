const Yup = require('yup');
const Time = require('../models/Time');
const CartolaFc = require('../../lib/CartolaFC');

class TimeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      time: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    // busco o time na base do cartola
    const { time } = req.body;
    const timeCartola = await CartolaFc.buscarTime(time);

    if (!timeCartola) {
      return res
        .status(400)
        .json({ error: 'Time não encontrado na base do CartolaFc!' });
    }
    // vejo se time já está cadastrado na base
    const timeExists = await Time.findOne({
      where: { id_time_cartola: timeCartola.data[0].time_id },
    });
    console.log(timeExists);
    if (timeExists) {
      return res.status(400).json({ error: 'Time já cadastrado!' });
    }

    // cadastro o time na base
    const { nome, nome_cartola, url_escudo_svg } = await Time.create({
      id_time_cartola: timeCartola.data[0].time_id,
      ...timeCartola.data[0],
    });
    return res.json({
      nome,
      nome_cartola,
      url_escudo_svg,
    });
  }
}

module.exports = new TimeController();
