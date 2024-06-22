import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const logoutButton = document.getElementById('logout');
const getStartedButton = document.getElementById('get-started');
const profile = document.getElementById('profile');
const avatarButton = document.getElementById('avatarButton');
const userDropdown = document.getElementById('userDropdown');
const fullscreenElements = document.querySelectorAll('.fullscreen-element');
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "driver", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('profile-name').innerText = userData.name;
                    document.getElementById('profile-email').innerText = userData.email;
                } else {
                    console.log("No document found matching id");
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            });

        logoutButton.style.display = 'block';
        getStartedButton.style.display = 'none';
        profile.style.display = 'block';
    } else {
        console.log("User Id not Found in Local storage");
        loggedUserName.textContext = '';
        logoutButton.style.display = 'none';
        getStartedButton.style.display = 'block';
        profile.style.display = 'none';
    }
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        });
});

// Toggle the visibility of the userDropdown when avatarButton is clicked
avatarButton.addEventListener('click', () => {
    userDropdown.classList.toggle('hidden');
});

// Toggle the visibility of the navbar when menuButton is clicked
menuButton.addEventListener('click', () => {
    showMenu.classList.toggle('hidden');
    fullscreenElements.forEach(element => {
        element.classList.toggle('hidden-fullscreen');
    });
});

document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

