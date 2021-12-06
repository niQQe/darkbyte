// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwE2r_nmOI7BAMR5yfcj69v6OgF3xPrwY",
    authDomain: "linkbin-4cda3.firebaseapp.com",
    projectId: "linkbin-4cda3",
    storageBucket: "linkbin-4cda3.appspot.com",
    messagingSenderId: "330093839761",
    appId: "1:330093839761:web:9fef5416450def6b884630",
    measurementId: "G-DK957V4GX6"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);
