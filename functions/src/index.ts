import * as functions from "firebase-functions";
require('dotenv').config()
const admin = require('firebase-admin');

var requestify = require('requestify');



// hostname: 'https://darkbyte.ent.europe-north1.gcp.elastic-cloud.com:443/api/as/v1/engines/darkbyte/search?auth_token=search-87dngvffut5wz18tx6regvoj&query=new`',
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const search = functions.https.onRequest(async (request, response) => {
    requestify.get(`${process.env.SEARCH_URL}${process.env.SEARCH_TOKEN}&query=${request.body.query}`)
        .then(function (res: any) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            response.send(res.getBody())
        }
        );
});


