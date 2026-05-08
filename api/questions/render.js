import bd from '../../lib/bd.js';

export default function handler(req, res) {
    const idUser = req.body.idUser;
    const progress = bd.progressUser.find(p => p.idUser === Number(idUser));

    if (!progress) {
        bd.progressUser.push({
            idUser: Number(idUser),
            queue: [1],
            actualQuests: 0,
            dailyTarget: 10
        });
    }
    if (progress.queue.length === 0) progress.queue.push(1);

    const nextQuestionId = progress.queue[0];
    const nextQuestion = bd.questions.find(q => q.id === nextQuestionId);

    return res.status(200).json({
        question: nextQuestion,
        progressUser: progress
    });
}