import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{ getFirestore, setDoc, doc, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

document.addEventListener('DOMContentLoaded', function(){

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
const auth = getAuth();
const db = getFirestore();

// AUTO COMPLETE
    function initializeAutocomplete(inputId) {
        const input = document.getElementById(inputId);
        const autocomplete = new google.maps.places.Autocomplete(input, {
            types: ['geocode'],
            componentRestrictions: { country: 'id' }
        });
    
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            console.log('Place:', place);
        });
    }
    
    initializeAutocomplete('pickup')
    initializeAutocomplete('destination')

    document.getElementById('submit-book').addEventListener('click', async () => {
        const pickup = document.getElementById('pickup').value;
        const destination = document.getElementById('destination').value;
        const pickupTimeInput = new Date(document.getElementById("pickupTime").value).toISOString();
        const packageInput = document.getElementById('package').value;

        if (!pickup || !destination) {
            alert("Please select valid locations from the autocomplete suggestions.");
            return;
        }

        if (!auth) {
            alert("You need to be logged in to book a ride.");
            return;
        }

        console.log(auth.uid)

        try {
            // const user = userCredentials.user
            const loggedInUserId=localStorage.getItem('loggedInUserId');
            const userData={
                uid: loggedInUserId,
                destination: destination,
                pickup: pickup,
                pickupTime: pickupTimeInput,
                package: packageInput
            }
            const docRef=doc(db, 'rides', loggedInUserId)
            setDoc(docRef,userData)
            .then(()=> {
                alert("Ride booked successfully!");
                window.location.href='booking-3.html'
            })
            .catch((error)=>{
                alert("error writing document", error)
            })
        } catch (error) {
            console.error("Error booking ride: ", error);
            alert("Failed to book the ride. Please try again.");
        }
    });
})
