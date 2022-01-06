import admin from 'firebase-admin'

const serviceAccount = require('./serviceAccount.json')

export function initFirebaseAdmin():admin.app.App {
    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}
export default admin