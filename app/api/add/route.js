import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("linknest")
    const collection = db.collection("links")

    //if handle is already claimed
    const doc = await collection.findOne({ handle: body.handle })
    if(doc){
        return Response.json({success:false,errer: true, message: 'Handle already taken',result:null})
    }

    const result = await collection.insertOne(body)
    console.log(body)
    return Response.json({success:true,errer: false, message: 'Your Linknest has been generated.',result:result, })
  }