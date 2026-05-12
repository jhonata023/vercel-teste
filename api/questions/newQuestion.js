import bd from '../../lib/bd.js';
import clientPromise from "../../lib/mongodb.js";

export default async function handler(req, res) {
    const {banca, ano, orgao, cargo, materia, submateria, enunciado, altA, altB, altC, altD, altE, correct, explicacao, nivel} = req.body;
    const validation = [altA, altB, altC, altD, altE];

    const alternativasProcessadas = validation.filter(item => item && item.trim() !== "");

    const client = await clientPromise;
    const db = client.db("questlog");

    const result = await db.collection("questions").insertOne({
        banca,
        ano: Number(ano),
        cargo,
        orgao,
        materia,
        submateria,
        enunciado,
        alternativas: alternativasProcessadas, 
        resposta: correct,
        nivel,
        explicacao
    })
    
    // bd.progressUser.forEach(progress => {
    //     progress.queue.push(newQuestion.id);
    // });

    res.status(201).json({msg: 'Questão Cadastrada com sucesso !'});
}