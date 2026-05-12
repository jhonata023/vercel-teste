import clientPromise from "../lib/mongodb.js";

export async function POST() {
    const client = await clientPromise;
    const db = client.db("questlog");
    
    const usuarios = await db
        .collection("users")
        .find({})
        .toArray();

    console.log(usuarios);
    
    return Response.json(usuarios);
}