export default function handler(req, res) {
    let bd = {
        user: [{id:1, name: 'Jhonata', lastName: 'Medeiros', email:'jhonata@gmail.com', password: 'asd'}],
        progressUser: [{idUser: 1, dailyTarget: 50, actualQuests: 26}],
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
            const question = bd.questions.find(quest => quest.id == req.body.idQuest);

            if (question) return res.status(200).json({msg: 'Parabéns, você acertou !'})
            else return res.status(200).json({msg: 'Você errou. Tente novamente !', correct: question.resposta})
        } if (req.body.op == 'nextQuest') {
            return res.status(200).json({msg: 'Conexão com servidor estabelecida.'})
        } if (req.body.op == 'home') {
            const user = bd.user.find(user => user.id == req.body.id);
            res.status(200).json(user);
        }
    }

    return res.status(405).json({ error: 'Método não permitido' });
}