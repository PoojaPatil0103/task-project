import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// ==================================================================
// INSTRUCTIONS:
// 1. Run: npm install firebase-admin
// 2. Go to Firebase Console -> Project Settings -> Service accounts
// 3. Click "Generate new private key"
// 4. Save the file as 'service-account.json' in this 'scripts' folder
// 5. Paste your FCM Token (from the React app) below
// 6. Run: node scripts/sendNotification.js
// ==================================================================

// REPLACE THIS WITH THE TOKEN FROM YOUR REACT APP
const registrationToken = 'e_rh1H-qChNvzm74kplmTT:APA91bHvkNGxUbZ3fax-JlkAJjGqHhpxcpKXIEteZqm781VAlqTrLMBk-zMXRqC3Mtomzl-W3ffVGXMWTpV8ft-ZWyzJvx_pzYgzTlIsYPzdccsPLwFVtlg';

try {
	const serviceAccount = JSON.parse(
		readFileSync(new URL('./service-account.json', import.meta.url))
	);

	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});

	const message = {
		notification: {
			title: 'Backend Test 🚀',
			body: 'This notification was sent from your Node.js backend!'
		},
		token: registrationToken
	};

	console.log('Sending notification...');

	admin.messaging().send(message)
		.then((response) => {
			console.log('Successfully sent message:', response);
		})
		.catch((error) => {
			console.log('Error sending message:', error);
		});

} catch (error) {
	console.error('Error: Could not load service-account.json. Did you download it from Firebase Console?');
	console.error(error.message);
}
