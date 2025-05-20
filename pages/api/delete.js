import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { handle, key } = req.body;

    if (!handle || !key) {
        return res.status(400).json({ success: false, message: "Handle and key are required" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("linknest");
        const collection = db.collection("links");

        const result = await collection.deleteOne({ handle, key });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Page not found or invalid key" });
        }

        res.status(200).json({ success: true, message: "Page deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
