importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAbJkQ4c6Ar6uws04B59XPcgRJTESlb0fM",
  authDomain: "salimsealcom.firebaseapp.com",
  projectId: "salimsealcom",
  storageBucket: "salimsealcom.appspot.com",
  messagingSenderId: "263942797821",
  appId: "1:263942797821:web:6eea304d13f8c763fd4194",
  measurementId: "G-GXGRC1LEY1",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
