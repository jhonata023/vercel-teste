import clientPromise from "../lib/mongodb.js";

export async function POST() {
    const client = await clientPromise;
    const db = client.db("questlog");
    
    const usuarios = await db
        .collection("users")
        .find({})
        .toArray();
    
    return Response.json(usuarios);
}