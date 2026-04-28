export default function handler(req, res) {
    let bd = {
        user: [{id:1, name: 'Jhonata', lastName: 'Medeiros', email:'jhonata@gmail.com', password: 'asd'}],
        progressUser: [{idUser: 1, dailyTarget: 50, actualQuests: 26, queue: []}],
        questions: [{
        id: 1,
        banca: 'CEBRASPE',
        ano: 2025,
        cargo: 'Agente',
        orgao: 'Polícia Federal',
        nivel: 'Superior',
        materia: 'Direito Constitucional',
        submateria: 'Artigo 5º',
        enunciado: `No que se refere aos direitos e garantias fundamentais previstos na Constituição Federal de 1988, julgue o item a seguir:
            "É plena a liberdade de associação para fins lícitos, inclusive a de caráter paramilitar, desde que haja prévia autorização estatal."`,
        alternativas: ['Certo', 'Errado'],
        resposta: 'E',
        explicacao: 'As de caráter paramilitar não são permitidas'
    }]
    }

    if (req.method === 'POST') {
        if (req.body.op == 'renderQuestion') {
            return res.status(200).json(bd);
        } if (req.body.op == 'resolveQuest') {
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
        } if (req.body.op == 'nextQuest') {
            const idUser = req.body.idUser
            const progress = bd.progressUser.find(p => p.idUser === Number(idUser));

            // if (!progress || progress.queue.length <= 1) {
            //     return res.status(400).json({ msg: "Não há questões suficientes para pular." });
            // }
            if (progress.queue.length === 0) {
                let novosIds = bd.questions.map(q => q.id);
                novosIds.sort(() => Math.random() - 0.5);
                progress.queue = novosIds;
            };

            const skippedId = progress.queue.shift();
            progress.queue.push(skippedId);

            const nextQuestionId = progress.queue[0];
            const nextQuestion = bd.questions.find(q => q.id === nextQuestionId);

            return res.status(200).json({
                msg: "Questão pulada!",
                nextQuestion: nextQuestion
            });

            if (isCorrect) {
                progress.queue.shift();
                progress.actualQuests += 1;
                
                const nextQuestionValid = bd.questions.find(q => q.id === progress.queue[0]);
                res.status(200).json({ msg: "Acertou!", nextQuestion: nextQuestionValid });
            }
        } if (req.body.op == 'home') {
            const user = bd.user.find(user => user.id == req.body.id);
            res.status(200).json(user);
        } if (req.body.op == 'newQuestion') {
            const {banca, ano, cargo, enunciado, altA, altB, altC, altD, altE, resposta, explicacao} = req.body;
            const newId = bd.questions.length > 0 ? Math.max(...bd.questions.map(q => q.id)) + 1 : 1;
            const validation = [altA, altB, altC, altD, altE];

            const alternativasProcessadas = validation.filter(item => item && item.trim() !== "");

            if (alternativasProcessadas.length < 2) {
                return res.status(400).json({ msg: "A questão deve ter pelo menos 2 alternativas preenchidas." });
            }

            const newQuestion = {
                id: newId,
                banca,
                ano: Number(ano),
                cargo,
                enunciado,
                alternativas: alternativasProcessadas, 
                resposta,
                explicacao
            };
            
            bd.questions.push(newQuestion);
            bd.progressUser.forEach(progress => {
                progress.queue.push(novaQuestao.id);
            });
            res.status(201).json({msg: 'Questão Cadastrada com sucesso !'});
        }
    }

    return res.status(405).json({ error: 'Método não permitido' });
}