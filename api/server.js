export default function handler(req, res) {
    let quest = {
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
        alternativaA: 'Certo',
        alternativaB: 'Errado',
        resposta: 'alternativaB',
        explicacao: 'As de caráter paramilitar não são permitidas'
    }

    if (req.method === 'POST') {
        return res.status(200).json(quest);
    }

    return res.status(405).json({ error: 'Método não permitido' });
}