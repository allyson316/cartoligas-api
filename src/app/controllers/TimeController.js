const Yup = require('yup');
const Time = require('../models/Time');

class TimeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      time_id: Yup.number().required(),
      nome: Yup.string().required(),
      nome_cartola: Yup.string().required(),
      slug: Yup.string().required(),
      facebook_id: Yup.string().nullable(),
      url_escudo_svg: Yup.string().required(),
      assinante: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    // vejo se time já está cadastrado na base
    const timeExists = await Time.findOne({
      where: { id_time_cartola: req.body.time_id },
    });

    if (timeExists) {
      return res.status(400).json({ error: 'Time já cadastrado!' });
    }

    // cadastro o time na base
    const { id, nome, nome_cartola, url_escudo_svg } = await Time.create({
      id_time_cartola: req.body.time_id,
      ...req.body,
    });
    return res.json({
      id,
      nome,
      nome_cartola,
      url_escudo_svg,
    });
  }
}

module.exports = new TimeController();
