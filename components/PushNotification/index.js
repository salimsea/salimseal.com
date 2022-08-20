import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { firebaseCloudMessaging } from "helpers/firebase";

function PushNotification({ children }) {
  const router = useRouter();
  useEffect(() => {
    setToken();
    console.log("woi");

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(
          "event for the service worker",
          event.data.firebaseMessaging.payload
        );
        getMessage(event.data.firebaseMessaging.payload.notification);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage(notification) {
    console.log("notification : ", notification);
    const messaging = firebase.messaging();
    toast(
      <div onClick={() => handleClickPushNotification(message?.data?.url)}>
        <h5 className="title-notif-toast">{notification?.title}</h5>
        <p>{notification?.body}</p>
      </div>,
      {
        closeOnClick: false,
      }
    );
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotification;
