import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{ getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

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

async function fetchRides() {
    const loggedInUserId=localStorage.getItem('loggedInUserId')
    const ridesRef = collection(db, 'rides');
    const q = query(ridesRef, where('driverID', '==', loggedInUserId));
    const querySnapshot = await getDocs(q);
    const container = document.querySelector('.flex-container');

    // const data = querySnapshot[0].data()

    if (querySnapshot.empty) {
        container.innerHTML = '<h2>You have no rides</h2>';
    } else {
        querySnapshot.forEach((doc) => {
            const ride = doc.data();
            // ride.id = doc.id; // Add the document ID to the ride object
            const rideElement = createRideElement(ride);
            container.appendChild(rideElement);
        });
    }
}

function createRideElement(ride) {
    // const Ref = doc(db, 'rides', ride.uid);
    // const passenger = getDoc(ref)
    // const passengerName = passenger.name
    // const qu = query(ridesRef, where('uid', '==', ride));

    const dateString = ride.pickupTime
    const firestoreDate = new Date(dateString);
    const today = new Date();
    const difference = Math.ceil((today-firestoreDate)/(1000*60*60*24))
    const flexrow = document.createElement('div');
    flexrow.className = 'flexrow';
    
    flexrow.innerHTML = `
        <div class="flexlogo">
            <div class="fleximg">
                <img src="img/driverlogo.png" alt="Image">
            </div>
        </div>
        <div class="flexwhite">
            <div class="gridbox">
                <div class="griditem1">
                    <div class="flexdown">
                        <h2 class="bold">Order ID</h2>
                        <h2>${ride.uid}</h2>
                    </div>
                </div>
                <div class="griditem2">
                    <div class="flexdown">
                        <h2 class="bold">Destination</h2>
                        <h2>${ride.destination}</h2>
                    </div>
                </div>
                <div class="griditem3">
                    <div class="flexdown">
                        <h2 class="bold">Pick Up Time</h2>
                        <h2>${ride.pickupTime}</h2>
                    </div>
                </div>
                <div class="griditem4">
                    <div class="flexdown">
                        <h2 class="bold">Package Type</h2>
                        <h2>${ride.package}</h2>
                    </div>
                </div>
                <div class="griditem5">
                    <div class="flexdown">
                        <h2 class="bold">Remaining Rides</h2>
                        <h2>${ride.difference} remaining rides</h2>
                    </div>
                </div>
                <div class="griditem6">
                    <div class="flexdown">
                        <button type="button" class="item14" onclick="location.href='driver-schedule-detail.html?id=${ride.id}'">Details</button> 
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return flexrow;
}

async function cancelRide(rideId) {
    await deleteDoc(doc(db, 'rides', rideId));
    alert('Ride cancelled successfully.');
    // Reload the rides
    const userId = auth.currentUser.uid;
    fetchRides(userId);
}

fetchRides();
// <h2 class="red" onclick="cancelRide('${ride.id}')">Cancel ride</h2>