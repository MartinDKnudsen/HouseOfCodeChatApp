const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.SendNotificationToSubedUsers = functions.firestore
  .document('Chats/{ChatRoom_id}/MESSAGES')
  .onCreate((snap, context) => {
    const ChatRoom_id = context.params.ChatRoom_id
    // const Message_id = context.params.Message_id
    const Room_Name = context.params.room_Name
    const title = context.params.title
    const message = context.params.text
    const user = context.params.user._id

    const payload = {
      notification: {
        title: "New massage in: '" + Room_Name + "' from " + user,
        body: message,
        chatRoom_id: ChatRoom_id,
      },
      topic: ChatRoom_id,
    }

    admin
      .messaging()
      .send(payload)
      .then((response) => {
        console.log('Successfully sent message:', response)
      })
      .catch((error) => {
        console.log('Error sending message:', error)
      })
  })
