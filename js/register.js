import { initializeApp } from '../https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'
import {
    getFirestore, collection, getDocs, addDoc, doc
} from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = require('./firebase-config');
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const colRef = collection(db, 'customer')

// const signupForm = document.getElementById('signup-form');

// getDocs(colRef)
//     .then((snapshot)=>{
//         let customer=[]
//         snapshot.docs.array.forEach(docs => {
//             customer.push({ ...doc.data(), id: doc.id})
//         });
//         console.log(customer)
//     })
//     .catch(err =>{
//         console.log(err.message)
//     })

// adding documents

// const addCustomer = document.querySelector('.add')
// addCustomer.addEventListener('submit', (e)=>{
//     e.preventDefault()

//     addDoc(colRef, {
//         name: addCustomer.name.value,
//         email: addCustomer.email.value,
//         password: addCustomer.password.value
//     })
//     .then(()=>{
//         addCustomer.reset()
//     })
// })

// signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         // Create user with email and password
//         const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
//         const user = userCredential.user;

//         // Update user display name
//         await user.updateProfile({
//             displayName: name
//         });

//         alert('User registered successfully!');
//         // Redirect to login page or any other page
//         window.location.href = 'login.html';
//     } catch (error) {
//         console.error('Error registering user:', error.message);
//         alert('Error registering user. Please try again.');
//     }
// });

// Get a reference to the form
const form = document.getElementById('signup-form');

// Add an event listener for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get input values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

  // Save data to Firestore
    try {
    // Add a new document with a generated ID to the "customer" collection
        await db.collection('customer').add({
            name: name,
            email: email,
            password: password
        })
        .then(() => {
            alert("Registered succesfully!")
        })
        .catch((error) => {
            alert("Error: ", error);
        })
        // Redirect to home page or display a success message
        window.location.href = 'login.html'; // Redirect to home page after successful registration
        // You can also display a success message here if you prefer
    } catch (error) {
        console.error('Error adding document: ', error)
        // Handle errors, such as displaying an error message to the user
    }
})
