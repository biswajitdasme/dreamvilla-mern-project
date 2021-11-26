const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iftkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function verifyToken(req, res, next) {
    if (req.headers?.authorization.startsWith('Bearer')) {
        const idToken = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req.decodedEmail = decodedToken.email;
            next();
        }
        catch (error) {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }
    else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}


async function run() {
    try {
        await client.connect();
        const database = client.db('dreamvilla');
        const propertyCollection = database.collection('properties');
        const orderCollection = database.collection('orders');
        const userCollection = database.collection('users');
        const reviewCollection = database.collection('reviews');
        const messageCollection = database.collection('messsage');

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.json(result);
        });

        app.put('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.updateOne({ email: user.email }, { $set: user }, { upsert: true });
            res.json(result);
        });

        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            let isAdmin = false;
            const user = await userCollection.findOne({ email });
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ isAdmin });
        })
        
        app.post('/properties', async (req, res) => {
            const property = req.body;
            const result = await propertyCollection.insertOne(property);
            res.json(result);
        });

        app.get('/properties', async (req, res) => {
            const result = await propertyCollection.find({}).toArray();
            res.json(result);
        });

        app.delete('/properties/:id', async (req, res) => {
            const id = req.params.id;
            const result = await propertyCollection.deleteOne({ _id: ObjectId(id) });
            res.json(result);
        });

        app.post('/property', async (req, res) => {
            const result = await orderCollection.insertOne(req.body);
            res.json(result);
        });
        
        app.get('/orders', async (req, res) => {
            const result = await orderCollection.find({}).toArray();
            res.json(result);
        });

        app.get('/orders/:email', async (req, res) => {
            const email = req.params.email;
            const result = await orderCollection.find({ email }).toArray();
            res.json(result);
        });

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const result = await orderCollection.deleteOne({ _id: ObjectId(id) });
            res.json(result);
        });

        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const result = await orderCollection.updateOne({ _id: ObjectId(id) }, { $set: { shipped: true } });
            res.json(result);
        });

        app.post('/reviews', async (req, res) => {
            const result = await reviewCollection.insertOne(req.body);
            res.json(result);
        });

        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find({}).toArray();
            res.json(result);
        });

        app.post('/message', async (req, res)=>{
            const result = await messageCollection.insertOne(req.body);
            res.json(result);
        });

        app.put('/users/admin', verifyToken, async (req, res) => {
            const email = req.body.email;
            if (req.decodedEmail) {
                let result = await userCollection.findOne({ email: req.decodedEmail });
                if (result.role === 'admin') {
                    result = await userCollection.updateOne({ email }, { $set: { role: 'admin' } });
                    res.json(result);
                }
                else {
                    res.json({error: 'You are not admin'});
                }
            }
            else res.status(403).json({ error: 'Forbidden' });
        });
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})