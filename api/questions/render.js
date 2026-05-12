// import bd from '../../lib/bd.js';
import clientPromise from "../../lib/mongodb.js";

export default async function handler(req, res) {
    // const idUser = req.body.idUser;
    // const progress = bd.progressUser.find(p => p.idUser === Number(idUser));

    // if (!progress) {
    //     bd.progressUser.push({
    //         idUser: Number(idUser),
    //         queue: [1],
    //         actualQuests: 0,
    //         dailyTarget: 10
    //     });
    // }
    // if (progress.queue.length === 0) progress.queue.push(1);

    const client = await clientPromise;
    const db = client.db("questlog");
    
    const question = await db
        .collection("questions")
        .find({})
        .toArray();

    return res.status(200).json({
        question: question[0],
        progressUser: {idUser: 1, dailyTarget: 50, actualQuests: 26, queue: []}
    });
}