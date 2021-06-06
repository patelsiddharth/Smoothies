import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDHB3aSFGvzJUOxhF7bvSIYVC4cF13Dh9o",
    authDomain: "smoothies-6ef11.firebaseapp.com",
    projectId: "smoothies-6ef11",
    storageBucket: "smoothies-6ef11.appspot.com",
    messagingSenderId: "253885595301",
    appId: "1:253885595301:web:e19a703480f4a28c57174c"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const fireStore = firebaseApp.firestore();
fireStore.settings({timestampsInSnapshots : true})

export default fireStore;