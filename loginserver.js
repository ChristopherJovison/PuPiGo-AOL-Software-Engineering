const express = require('express');
const app = express();
const port = 5501; // Use environment variable or default to 3000

app.use(express.json());

// Firebase Admin SDK initialization
const admin = require('firebase-admin');
const serviceAccount = require('./pupigo-eb91c-firebase-adminsdk-15a73-355d831b3b.json'); // Download from Firebase Console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pupigo-eb91c-default-rtdb.firebaseio.com'
});

const db = admin.firestore();
const colRef = collection(db, 'customer')

app.use(express.json());

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Create user with email and password
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        await db.collection('customer').doc(userRecord.uid).set({
            name,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send('Error registering user');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});