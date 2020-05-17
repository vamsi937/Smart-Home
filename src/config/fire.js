import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD3zRSfcKbuAKrlCADvAX_oNHdJ6ucIm1A",
    authDomain: "iotlab-63a97.firebaseapp.com",
    databaseURL: "https://iotlab-63a97.firebaseio.com",
    projectId: "iotlab-63a97",
    storageBucket: "iotlab-63a97.appspot.com",
    messagingSenderId: "766801690592",
    appId: "1:766801690592:web:2acc697eb178a455c03585",
    measurementId: "G-KBCXJ38PKP"
};

const fire=firebase.initializeApp(firebaseConfig);

export default fire;