import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js'
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

const app = initializeApp(firebaseConfig);
const sto = getStorage();

var fileText = document.querySelector(".fileText")
var fileItem
var fileName
var img = document.querySelector(".img")

// function getFile(e){
//   fileItem = e.target.files[0]
//   fileName = fileItem.name
//   fileText.innerHTML = fileName
// }

// function uploadImage(){
//   let storageRef = sto.storage().ref("images/"+fileName)
//   let uploadTask = storageRef.put(fileItem)

//   uploadTask.on("state_changed", (snapshot)=>{
//     console.log(snapshot)
//   }, (error)=>{
//     alert("Error uploading image!")
//     console.log("error", error)
//   }, ()=>{
//     uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//       console.log("URL", url)

//       if(url != ""){
//         img.setAttribute("src", url)

//       }
//     })
//   })
// }

document.addEventListener('DOMContentLoaded', ()=> {

    const signUpDriver = document.getElementById('submit-driver');
    signUpDriver.addEventListener('click', (event)=>{
        event.preventDefault();
        const fullName=document.getElementById('fullName').value;
        const driverEmail=document.getElementById('driverEmail').value;
        const phone=document.getElementById('phone').value;
        const password=document.getElementById('password').value;
        const typeOfCar=document.getElementById('typeOfCar').value
        const domicile=document.getElementById('domicile').value
        // const expirationDate=document.getElementById('expirationDate').value
        const address=document.getElementById('address').value
        const postalCode=document.getElementById('postal-code').value

        const auth=getAuth();
        const db=getFirestore();
        createUserWithEmailAndPassword(auth, driverEmail, password)
        .then((userCredential)=>{
            const user=userCredential.user;
            const userData={
                name: fullName,
                email: driverEmail,
                phone: phone,
                typeOfCar: typeOfCar,
                domicile: domicile,
                // expirationDate: expirationDate,
                address: address,
                postalCode: postalCode,
                driver: "yes"
            };
            alert("Account created successfully")
            const docRef=doc(db, "driver", user.uid);
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
                alert('Email address already exists');
            }
            else{
                alert('Unable to create account', error);
            }
        })
    });
})