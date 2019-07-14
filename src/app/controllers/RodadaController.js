const Yup = require('yup');
const Rodada = require('../models/Rodada');
const Liga = require('../models/Liga');
const CartolaFc = require('../../lib/CartolaFC');

class RodadaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      ligaId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const { ligaId } = req.body;

    const checkIsLiga = await Liga.findOne({ where: { id: ligaId } });

    if (!checkIsLiga) {
      return res.status(401).json({
        error: 'Rodadas só podem ser criadas para ligas cadastradas!',
      });
    }
    const rodadas = await CartolaFc.buscarRodadas();

    if (!rodadas) {
      return res
        .status(400)
        .json({ error: 'Rodadas não recuperadas da api do cartola!' });
    }

    const rodadasExists = await Rodada.findOne({
      where: { id_rodada_cartola: rodadas.data[0].rodada_id },
    });

    if (rodadasExists) {
      return res
        .status(400)
        .json({ error: 'Rodadas já cadastradas para a liga!' });
    }

    const rodadasResult = await Promise.all(
      rodadas.data.map(async rodada => {
        const createRodada = await Rodada.create({
          id_liga: ligaId,
          id_rodada_cartola: rodada.rodada_id,
          ...rodada,
        });
        return createRodada;
      })
    );

    return res.json(rodadasResult);
  }
}

module.exports = new RodadaController();
