import bd from '../../lib/bd.js';

export default function handler(req, res) {
    const idUser = req.body.idUser;
    const progress = bd.progressUser.find(p => p.idUser === Number(idUser));

    if (!progress) {
        return res.status(404).json({ msg: "Progresso do usuário não encontrado." });
    }
    if (progress.queue.length === 0) {
        let novosIds = bd.questions.map(q => q.id);
        novosIds.sort(() => Math.random() - 0.5);
        progress.queue = novosIds;
    };
    if (progress.queue.length <= 1) {
        return res.status(400).json({ msg: "Não há questões suficientes para pular." });
    }

    const skippedId = progress.queue.shift();
    progress.queue.push(skippedId);

    const nextQuestionId = progress.queue[0];
    const nextQuestion = bd.questions.find(q => q.id === nextQuestionId);

    if (!nextQuestion) {
        return res.status(404).json({ msg: "A próxima questão ("+ nextQuestionId +"}) não foi encontrada no banco de dados." });
    }

    return res.status(200).json({
        msg: "Questão pulada!",
        nextQuestion: nextQuestion
    });

    // if (isCorrect) {
    //     progress.queue.shift();
    //     progress.actualQuests += 1;
        
    //     const nextQuestionValid = bd.questions.find(q => q.id === progress.queue[0]);
    //     res.status(200).json({ msg: "Acertou!", nextQuestion: nextQuestionValid });
    // }
};