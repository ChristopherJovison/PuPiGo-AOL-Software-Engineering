import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{ getFirestore, setDoc, doc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

let map, directionsService, directionsRenderer;
let sourceAutocomplete, destAutocomplete

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

const app = initializeApp(firebaseConfig)
const db=getFirestore()

const loggedInUserId=localStorage.getItem('loggedInUserId');
const colRef=collection(db, 'rides', loggedInUserId)
const docSnap = await getDocs(colRef)
const destination = docSnap.data().destination
const pickup = docSnap.data().pickup

const ref=collection((db, 'customer', loggedInUserId))
const snap=await getDocs(ref)
const driveRef=collection((db, 'driver', docSnap.driverID))
const driveSnap=await getDocs(driveRef)

const userData=snap.data();
const driver = driveSnap.data();
document.getElementById('nama').innerText=userData.name;
document.getElementById('typeOfCar').innerText=userData.driver;

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const selectedMode = document.getElementById("mode").value;

    directionsService
        .route({
            origin: { lat: 37.77, lng: -122.447 }, // Haight.
            destination: { lat: 37.768, lng: -122.511 }, // Ocean Beach.
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode["DRIVING"],
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}

function calcRoute(){
    // var source = pickup
    // var destination = destination
    let request = {
        origin:sourceAutocomplete,
        destination:destAutocomplete,
        travelMode:"DRIVING"
    };

    directionsService.route(request, function(result, status){
        if(status == "OK"){
            directionsRenderer.setDirections(result);
        }
    })
}

async function cancelRide() {
    const loggedInUserId = localStorage.getItem('loggedInUserId')
    await deleteDoc(doc(db, 'rides', loggedInUserId));
    alert('Ride cancelled successfully.');
    // Reload the rides
    const userId = auth.currentUser.uid;
    fetchRides(userId);
}