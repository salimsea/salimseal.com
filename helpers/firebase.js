import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseConfig = {
  apiKey: "AIzaSyAbJkQ4c6Ar6uws04B59XPcgRJTESlb0fM",
  authDomain: "salimsealcom.firebaseapp.com",
  projectId: "salimsealcom",
  storageBucket: "salimsealcom.appspot.com",
  messagingSenderId: "263942797821",
  appId: "1:263942797821:web:6eea304d13f8c763fd4194",
  measurementId: "G-GXGRC1LEY1",
};

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp(firebaseConfig);

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem("fcm_token");
        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        console.log("status : ", status);
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              "BCOG5ryjDFXBM134seQnj3Uh-34EOnQLncXE9V-MeTYBzVCclukXResywjFfDx7_OiCvsKAy25nnz7bDoxo1GuY",
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
