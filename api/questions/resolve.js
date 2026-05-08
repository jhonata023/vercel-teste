import bd from '../../lib/bd.js';

export default function handler(req, res) {
    try {
        const question = bd.questions.find(quest => quest.id == Number(req.body.idQuest));
            
        if (!question) return res.status(404).json({ msg: 'Questão não encontrada!', valid: false});
        if (req.body.userAnswer === question.resposta) {
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