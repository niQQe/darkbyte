import * as functions from "firebase-functions";
// import { doc, deleteDoc } from "firebase/firestore";
require('dotenv').config()
const admin = require('firebase-admin');
var requestify = require('requestify');
admin.initializeApp();
const db = admin.firestore()
// const db = admin.firestore();

export const search = functions.region('europe-west1').https.onRequest(async (request, response) => {
    try {
        const res = await requestify.post(`${process.env.SEARCH_URL}${process.env.SEARCH_TOKEN}`, {
            query: request.body.query,
            filters: {
                "private": ["false"]
            }
        })
        response.send(res.getBody())

    } catch (e) {
        console.log();
    }
});

export const deleteFollower = functions.region('europe-west1').firestore
    .document('/lists/{listId}/following/{userId}')
    .onDelete(async (snap, context) => {
        console.log(context);
        console.log(snap.data());
        const ref = db.doc(`users/${context.params.userId}/following/${context.params.listId}`)
        await ref.delete()
        // await deleteDoc(doc(db, "users", context.params.userId, 'following', snap.data().listId));
    });


