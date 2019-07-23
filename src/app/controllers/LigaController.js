const Yup = require('yup');
const Liga = require('../models/Liga');

class LigaController {
  async index(req, res) {
    // const { userId } = req.UserId;

    const ligas = await Liga.findAll({
      where: { id: 6 },
    });
    return res.json(ligas);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const ligaExists = await Liga.findOne({
      where: { nome: req.body.nome },
    });

    if (ligaExists) {
      return res.status(400).json({ error: 'Liga já cadastrada!' });
    }

    const liga = await Liga.create(req.body);
    return res.json(liga);
  }
}

module.exports = new LigaController();
