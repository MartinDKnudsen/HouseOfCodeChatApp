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
      },
      topic: "jem5UU7MS2qOBLTA97jD",
      data: {room_id: "jem5UU7MS2qOBLTA97jD"},
    };
   const response = await admin.messaging().send(message);
    console.log(response);
  });

exports.sendNotificationMessageToTopic = functions.firestore
.document("Chats/{room_id}")
.onWrite(async (context) => {
const name = JSON.stringify(context);
    const message = {
      notification: {
        title: "Hey",
        body: "Works",
      },
      topic: "jem5UU7MS2qOBLTA97jD",
      data: {room_id: name},
    };
      const response = await admin.messaging().send(message);
      console.log(response); console.log(name);
});