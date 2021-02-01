const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp(functions.config().firebase)

exports.sendNotificationOnMessageToSubscribers = functions.firestore
  .document("Chats/{room_id}")
  .onWrite(async (context) => {
    const id = context["before"]["_ref"]["_path"]["segments"][1]
    const titleText =
      context["after"]["_fieldsProto"]["latestMessage"]["mapValue"]["fields"][
        "text"
      ]["stringValue"]
    const roomName = context["after"]["_fieldsProto"]["name"]["stringValue"]

    const message = {
      notification: {
        title: "Room: " + roomName + " has a new message",
        body: titleText,
      },
      topic: id,
      data: { room_id: id, room_name: roomName },
    }
    await admin.messaging().send(message)
  })
