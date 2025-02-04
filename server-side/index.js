const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://demoImageHosting:OI7KwhMpUsoG4Hgp@cluster0.766g6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect(); // Establish the connection

        const db = client.db("demoImageHosting"); // Use correct database name
        const imageCollection = db.collection("image"); // Get the collection

        // Multer Configuration (Store in Memory)
        const storage = multer.memoryStorage();
        const upload = multer({ storage });

        // API Endpoint for Image Upload
        app.post('/upload', upload.single('image'), async (req, res) => {
            try {
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    ).end(req.file.buffer);
                });

                // Save Image URL in MongoDB (Without Mongoose)
                await imageCollection.insertOne({ imageUrl: result.secure_url });

                res.json({ imageUrl: result.secure_url });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // API Endpoint to Fetch All Uploaded Images
        app.get('/images', async (req, res) => {
            try {
                const images = await imageCollection.find().toArray();
                res.json(images);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

run().catch(console.dir);



// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
