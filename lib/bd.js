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
    },
    {
        id: 2,
        banca: 'CEBRASPE',
        ano: 2024,
        cargo: 'Teste',
        orgao: 'Polícia Federal',
        nivel: 'Médio',
        materia: 'Direito Constitucional',
        submateria: 'Artigo 5º',
        enunciado: `No que se refere aos direitos e garantias fundamentais previstos na Constituição Federal de 1988, julgue o item a seguir:
            "É plena a liberdade de associação para fins lícitos, inclusive a de caráter paramilitar, desde que haja prévia autorização estatal."`,
        alternativas: ['Certo', 'Errado'],
        resposta: 'E',
        explicacao: 'As de caráter paramilitar não são permitidas'
    }]
}

export default bd;