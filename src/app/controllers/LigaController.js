const Yup = require('yup');
const Liga = require('../models/Liga');

class LigaController {
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
