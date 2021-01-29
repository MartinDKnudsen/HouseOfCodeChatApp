const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore
  .document("Chats/jem5UU7MS2qOBLTA97jD")
  .onWrite(async (event) => {
    const message = {
      notification: {
        title: "Hey",
        body: "Works",
        roomid: "jem5UU7MS2qOBLTA97jD",
      },
      topic: "jem5UU7MS2qOBLTA97jD",
    };
    const response = await admin.messaging().send(message);
    console.log(response);
  });