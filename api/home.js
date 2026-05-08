import bd from '../lib/bd.js';

export default function handler(req, res) {
    const user = bd.user.find(user => user.id == req.body.id);
    res.status(200).json(user);
};