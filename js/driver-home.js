import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{ getFirestore, setDoc, doc, getDoc, getDocs, collection,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

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
const db = getFirestore();
const showPopup = document.querySelector('.show-popup')
const popupContainer = document.querySelector('.popup-container')
let starContainer = document.querySelectorAll(".star-container");
const submitButton = document.querySelector("#submit");



document.addEventListener('DOMContentLoaded', () => {


    

    async function showRide(){
    
        const loggedInUserId = localStorage.getItem('loggedInUserId')
        const querySnapshot = await getDocs(collection(db, 'rides'))
        const ref=doc(db, 'rides', loggedInUserId)
        const docSnap = await getDoc(ref)
        const driverListElement = document.getElementById('container-list')
        
        if(docSnap.exists()){
            
            const data = docSnap.data()
            console.log(data)
            
            const driveRef=doc(db,'driver',data.driverID)
            const driveSnap = await getDoc(driveRef)
            const driver = driveSnap.data()
            console.log(driver)
            
            const dateString = data.pickupTime
            const firestoreDate = new Date(dateString);
            const today = new Date();
            const difference = Math.ceil((today-firestoreDate)/(1000*60*60*24))
    
            
            const driverBox = document.createElement('div')
            driverBox.className = 'driver-box-1'
            driverBox.innerHTML= `
            <div class="flexrow">
                    <!-- logo of bus-->
                    <div class="flexlogo">
                        <div class="fleximg">
                        <img src="img/driverlogo.png" alt="Image">
                        </div>
                    </div>
    
                    <!-- white box -->
                    <div class="flexwhite">
                        <div class="gridbox">
                        <!-- item 1-->
                            <div class="griditem1">
    
                                <div class="flexdown">
                                    <h2 class="bold">Driver Info</h2>
                                    <h2>${driver.name}</h2>
                                    <img src="img/driverimg.png" alt="Image">
                                </div>
                                
                            </div>
    
                            <!-- item 2-->
                            <div class="griditem2">
    
                                <div class="flexdown">
                                    <h2 class="bold">Vehicle</h2>
                                    <h2>${driver.typeOfCar}</h2>
                                    
                                </div>
                            </div>
    
                            <div class="griditem3">
    
                                <div class="flexdown">
                                    <h2 class="bold">Status</h2>
                                    <h2>Heading Home</h2>
                                </div>
                                
                            </div>
    
                            <div class="griditem4">
    
                                <div class="flexdown">
                                    <h2 class="bold">Package Type</h2>
                                    <h2>${data.package}</h2>
                                    
                                </div>
                                
                            </div>
    
                            <div class="griditem5">
    
                                <div class="flexdown">
                                    <h2 class="bold">Remaining Rides</h2>
                                    <h2>${difference}</h2>
                                    
                                </div>
                                
                            </div>
    
                            <div class="griditem6">
    
                                <div class="flexdown">
                                    <button type="button" class="item14" onclick="location.href='driver-go.html'">Details</button> 
                                    
                                    
                                    
                                    <a class="rating-ride" href="cobacoba.html">
                                        Rate this ride
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            `
            document.getElementById("container-list").appendChild(driverBox)
            // document.getElementById("container-list").style.display="block"
        } else {
            document.getElementById("noRidesMessage").style.display="block"
        }
    }
    showRide();

    
});



