// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const setupFirebase = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCtaI5KS3ZGHmfCC6KZtnQoFrpnH7xu0JI",
      authDomain: "wheres-waldo-b3280.firebaseapp.com",
      projectId: "wheres-waldo-b3280",
      storageBucket: "wheres-waldo-b3280.appspot.com",
      messagingSenderId: "398627588009",
      appId: "1:398627588009:web:8894cc09e26b82aaa026b8"
    };
    
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    return {app};
}

export default setupFirebase;