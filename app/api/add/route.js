import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("linknest");
  const collection = db.collection("links");

  // Check if the handle already exists for the same userId
  const existingDoc = await collection.findOne({
    handle: body.handle,
    userId: body.userId,
  });

  if (existingDoc) {
    // If the handle exists, verify the key for editing
    if (existingDoc.key !== body.key) {
      return Response.json({
        success: false,
        error: true,
        message: "Handle already taken or invalid key for this user",
        result: null,
      });
    }

    // Update the existing document
    await collection.updateOne(
      { handle: body.handle, userId: body.userId },
      {
        $set: {
          links: body.links,
          pic: body.pic,
          desc: body.desc,
          displayName: body.displayName, // Update displayName
        },
      }
    );

    return Response.json({
      success: true,
      error: false,
      message: "Your Linknest has been updated.",
      result: null,
    });
  }

  // If the handle does not exist, create a new document
  const result = await collection.insertOne({
    ...body,
    key: body.key, // Ensure the key is stored
  });

  return Response.json({
    success: true,
    error: false,
    message: "Your Linknest has been generated.",
    result: result,
  });
}