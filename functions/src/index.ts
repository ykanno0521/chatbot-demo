/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
  response.send({
    statusCode,
    body: JSON.stringify(body),
  });
};

/**
 * Execute the following command in your Terminal app
 * curl -X POST https://YOUR_REGION-YOUR_PROJECT_NAME.cloudfunctions.net/addDataset -H "Content-Type:application/json" -d @dataset.json
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
  // eslint-disable-next-line quotes
  if (req.method !== 'POST') {
    sendResponse(res, 405, {error: "Invalid Request!"});
  } else {
    const dataset = req.body;
    for (const key of Object.keys(dataset)) {
      const data = dataset[key];
      // 逐次実行
      await db.collection("questions").doc(key).set(data);
    }
    sendResponse(res, 200, {message: "Successfully added dataset!"});
  }
});
