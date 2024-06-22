// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{ getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

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

let forgotPassButton = document.getElementById('forgot-password')

// login
document.addEventListener('DOMContentLoaded', ()=> {
    const signIn=document.getElementById('submit-login');
    signIn.addEventListener('click', (event)=>{
        event.preventDefault();
        const db = getFirestore()
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const auth=getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            showMessage('Login successful', 'signInMessage');
            const user=userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            const ref=doc(db, 'driver', user.uid)
            getDoc(ref)
            .then((docSnapshot)=>{
                if(docSnapshot.exists()){
                    const userData = docSnapshot.data()
                    if(userData.driver === 'yes'){
                        window.location.href="driver-schedule.html"
                    } else {
                        // window.location.href="home.html"
                    }
                } else {
                    window.location.href="home-1.html"
                }
            })
        })
        .catch((error)=>{
            const errorCode=error.code;
            if(errorCode==='auth/invalid-credential'){
                showMessage('Incorrect email or password', 'signInMessage');
            }
            else{
                console.log(error)
                showMessage('Account does not exist', 'signInMessage');
            }
        })
    })
    
    const auth1 = getAuth(app)

    let forgotPassword = ()=>{
        sendPasswordResetEmail(auth1, email.value)
        .then(()=>{
            showMessage('A password reset link has been sent to your email', 'signInMessage')
        })
        .catch((error)=>{
            console.log(error.code)
            console.log(error.message)
        })
    }
    
    forgotPassButton.addEventListener('click', forgotPassword)
})
