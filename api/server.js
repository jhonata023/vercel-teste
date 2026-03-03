export default function handler(req, res) {
    if (req.method === 'POST') {
        return res.status(200).json({
            msg: 'O texto enviado para o back foi o ' + req.body.msg
        });
    }

    return res.status(405).json({ error: 'Método não permitido' });
}