const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
require('firebase/firestore');

const app = express();

// Initialize Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyCvmNJE-yDP_hS-hzmwWUMxghVAM8qIXKM",
    authDomain: "pupigo-eb91c.firebaseapp.com",
    databaseURL: "https://pupigo-eb91c-default-rtdb.firebaseio.com",
    projectId: "pupigo-eb91c",
    storageBucket: "pupigo-eb91c.appspot.com",
    messagingSenderId: "24202736954",
    appId: "1:24202736954:web:d6d57dd85ae339d1888c03",
    measurementId: "G-PNJG850806"
};

firebase.initializeApp(firebaseConfig)

// Initialize Firestore
const db = firebase.firestore();

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await db.collection('customer').where('email', '==', email).where('password', '==', password).get();

        if (userDoc.empty) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

    // Authentication successful
    // You can start a session or set cookies here

        return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

const PORT = 5501;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
