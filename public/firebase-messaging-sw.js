import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import {
  getMessaging,
  getToken,
  onMessage,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbJkQ4c6Ar6uws04B59XPcgRJTESlb0fM",
  authDomain: "salimsealcom.firebaseapp.com",
  projectId: "salimsealcom",
  storageBucket: "salimsealcom.appspot.com",
  messagingSenderId: "263942797821",
  appId: "1:263942797821:web:6eea304d13f8c763fd4194",
  measurementId: "G-GXGRC1LEY1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

function initFirebaseMessagingRegistration() {
  // Don't forget your vapidKey here
  getToken(messaging, {
    vapidKey:
      "BCOG5ryjDFXBM134seQnj3Uh-34EOnQLncXE9V-MeTYBzVCclukXResywjFfDx7_OiCvsKAy25nnz7bDoxo1GuY",
  })
    .then((t) => {
      tokenElement.innerHTML = "Token is " + r;
    })
    .catch(function (err) {
      errorElement.innerHTML = "Error: " + err;
      console.log("Didn't get notification permission", err);
    });

  onMessage(messaging, (payload) => {
    console.log("Message received. ", JSON.stringify(payload));
    notificationElement.innerHTML =
      notificationElement.innerHTML + " " + payload.data.notification;
  });
}

initFirebaseMessagingRegistration();
