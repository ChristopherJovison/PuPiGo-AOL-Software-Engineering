// import firebase from "firebase/app"
// import "firebase/firestore"

// var firebase = require("firebase/app")
// require("firebase/firestore")
// require("firebase/auth")
// import firebase from "firebase/compat/app";
// Required for side-effects
// import "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import firebase from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'

const provider = new GoogleAuthProvider();
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'


// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js'

// Add Firebase products that you want to use
import { GoogleAuthProvider, getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'

const auth = getAuth();
signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const email1 = document.getElementById('email').value;
        const password1 = document.getElementById('password').value;

        try {
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
            
            const firebaseApp = initializeApp(firebaseConfig);
            
            // Initialize Firestore
            const db = getFirestore();
            const userDoc = await db.collection('customer').where('email', '==', email).where('password', '==', password).get();

            if (userDoc.empty) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
        
            // const response = await fetch('/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     email: email1,
            //     password: password1
            // });

            // const data = await response.json();

            // if (response.ok) {
            //     // Redirect to dashboard or home page
            //     window.location.href = '/home.html';
            // } else {
            //     // Display error message to the user
            //     alert(data.message);
            // }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

