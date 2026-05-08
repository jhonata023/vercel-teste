import bd from '../../lib/bd.js';

export default function handler(req, res) {
    const {banca, ano, orgao, cargo, enunciado, altA, altB, altC, altD, altE, resposta, explicacao, nivel} = req.body;
    const newId = bd.questions.length > 0 ? Math.max(...bd.questions.map(q => q.id)) + 1 : 1;
    const validation = [altA, altB, altC, altD, altE];

    const alternativasProcessadas = validation.filter(item => item && item.trim() !== "");

    // if (alternativasProcessadas.length < 2) {
    //     return res.status(400).json({ msg: "A questão deve ter pelo menos 2 alternativas preenchidas." });
    // }

    const newQuestion = {
        id: newId,
        banca,
        ano: Number(ano),
        cargo,
        enunciado,
        alternativas: alternativasProcessadas, 
        resposta,
        nivel,
        explicacao
    };
    
    bd.questions.push(newQuestion);
    bd.progressUser.forEach(progress => {
        progress.queue.push(newQuestion.id);
    });
    res.status(201).json({msg: 'Questão Cadastrada com sucesso !'});
}