const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

function getSubscriberTokens() {
  return admin.database().ref(`/subscribers/`).once("value");
}

exports.vote = functions.https.onRequest((req, res) => {
  console.log(req.body);

  const { vote, token } = JSON.parse(req.body);

  console.log("TOKEN", token, vote);

  return admin
    .database()
    .ref(`/vote-tokens/${token}`)
    .once("value")
    .then(snap => {
      const { name, user } = snap.val();
      admin.database().ref(`/names/${name}/votes/${user}`).set(vote);
      snap.ref.remove();
      res.status(200).send();
    });
});

exports.notify = functions.database.ref("/names/{id}").onWrite(event => {
  const newName = event.data._newData;

  if (event.data._data) {
    // It already exists, so this is a vote or delete
    return;
  }

  if (!newName) {
    return;
  }

  return getSubscriberTokens().then(tokenSnap => {
    const tokens = Object.keys(tokenSnap.val());

    return tokens.map(token => {
      const ref = admin.database().ref("/vote-tokens").push({
        user: event.auth.variable.uid,
        name: event.params.id
      });

      console.log(ref);

      const payload = {
        data: {
          name: newName.name,
          key: ref.getKey()
        }
      };

      return admin.messaging().sendToDevice([token], payload).then(res => {
        if (result.error) {
          console.log("Failure sending to", tokens[index], result.error);
          if (
            result.error.code === "messaging/invalid-registration-token" ||
            result.error.code === "messaging/registration-token-not-registered"
          ) {
            return tokenSnap.ref.child(tokens[index]).remove();
          }
        }
      });
    });
  });
});
