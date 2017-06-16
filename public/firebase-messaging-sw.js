// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "556661745373"
});

const authToken = null;

self.addEventListener("message", function(event) {
  console.log("SW Received Message: " + event.data);
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

function getAuthToken() {
  return new Promise((resolve, reject) => {
    resolve("blah");
  });
}

// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "New Suggestion";
  const notificationOptions = {
    body: payload.data.name,
    data: payload.data,
    actions: [
      { action: "yes", title: "Vote Yes" },
      { action: "no", title: "Vote No" }
    ]
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  console.log(event.notification);

  if (event.action === "") {
    clients.openWindow("/");
  } else {
    fetch("https://us-central1-name-vote.cloudfunctions.net/vote", {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({
        token: event.notification.data.key,
        vote: event.action
      })
    });
  }
});
// [END background_handler]
