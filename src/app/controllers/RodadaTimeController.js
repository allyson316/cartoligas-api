const Yup = require('yup');
const RodadaTime = require('../models/RodadaTime');
const Rodada = require('../models/Rodada');
const Time = require('../models/Time');

class RodadaTimeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      rodadaId: Yup.number().required(),
      timeId: Yup.number().required(),
      pago: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const { rodadaId, timeId, pago } = req.body;

    const rodadaExists = await Rodada.findByPk(rodadaId);

    if (!rodadaExists) {
      return res.status(400).json({ error: 'Rodada não cadastrada!' });
    }

    const timeExists = await Time.findByPk(timeId);

    if (!timeExists) {
      return res.status(400).json({ error: 'Time não cadastrado!' });
    }

    const checkTimeOnRodada = await RodadaTime.findOne({
      where: { id_rodada: rodadaId, id_time: timeId },
    });

    if (checkTimeOnRodada) {
      return res
        .status(400)
        .json({ error: 'Time já está adicionado na rodada!' });
    }

    const rodadaTime = await RodadaTime.create({
      id_rodada: rodadaId,
      id_time: timeId,
      pago,
    });

    return res.json(rodadaTime);
  }

  async index(req, res) {
    const { rodadaId } = req.query;
    const times = await RodadaTime.findAll({
      where: { id_rodada: rodadaId },
      attributes: ['id', 'pago'],
      include: [
        {
          model: Time,
          as: 'time',
          attributes: [
            'id_time_cartola',
            'nome',
            'nome_cartola',
            'url_escudo_svg',
          ],
          order: ['nome'],
        },
      ],
    });
    return res.json(times);
  }
}

module.exports = new RodadaTimeController();
