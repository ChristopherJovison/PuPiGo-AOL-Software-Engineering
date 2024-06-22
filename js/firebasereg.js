// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{ getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

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

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;

    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

document.addEventListener('DOMContentLoaded', ()=> {

    const signUp = document.getElementById('submit-register');
    signUp.addEventListener('click', (event)=>{
        event.preventDefault();
        const name=document.getElementById('rName').value;
        const email=document.getElementById('rEmail').value;
        const password=document.getElementById('rPassword').value;
        const auth=getAuth();
        const db=getFirestore();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user=userCredential.user;
            const userData={
                name: name,
                email: email,
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef=doc(db, "customer", user.uid);
            setDoc(docRef,userData)
            .then(()=>{
                window.location.href='login.html';
            })
            .catch((error)=>{
                console.error("error writing document", error);
            });
        })
        .catch((error)=>{
            const errorCode=error.code;
            if(errorCode=='auth/email-already-in-use'){
                showMessage('Email address already exists', 'signUpMessage');
            }
            else{
                showMessage('Unable to create account', 'signUpMessage');
            }
        })
    });
})
