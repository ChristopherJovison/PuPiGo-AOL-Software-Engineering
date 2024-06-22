console.log("test")

// import { initializeApp } from 'firebase/app';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
    collection,
    getDoc,
    getFirestore
} from 'firebase/firestore';

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

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'customer')

// get collection data
console.log("test")
getDocs(colRef)
    .then((snapshot)=>{
        let customer=[]
        snapshot.docs.array.forEach(docs => {
            customer.push({ ...doc.data(), id: doc.id})
        });
        console.log(customer)
    })
    .catch(err =>{
        console.log(err.message)
    })
