import bd from '../../lib/bd.js';

export default function handler(req, res) {
    return res.status(200).json(bd);
}