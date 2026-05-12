import bd from '../../lib/bd.js';
import clientPromise from "../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    try {
        const idUser = req.body.idUser;

        const progress = bd.progressUser.find(p => p.idUser === Number(idUser));
        
        const client = await clientPromise;
        const db = client.db("questlog");
        const idQuest = req.body.idQuest
        
        const question = await db
            .collection("questions")
            .findOne({_id: new ObjectId(idQuest)})

        if (!question) return res.status(404).json({ msg: 'Questão não encontrada!', valid: false});
            
        if (req.body.userAnswer === question.resposta) {
            progress.queue.shift();
            progress.actualQuests += 1;

            return res.status(200).json({ 
                msg: 'Parabéns, você acertou!',
                explicacao: question.explicacao,
                valid: true
            });
        }
        else {
            return res.status(200).json({ 
                msg: 'Você errou. Tente novamente!', 
                correct: question.resposta,
                explicacao: question.explicacao,
                valid: false,
                userAnswer: req.body.userAnswer
            });
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
        error: 'Erro interno do servidor',
        details: error.message
        });
    }
};