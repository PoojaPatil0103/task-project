export const firebaseConfig = {
	apiKey: "AIzaSyDjGuH0ukKK39eWhCW81CvhDzUJ8f9fLN4",
	authDomain: "fir-notification-8ebbe.firebaseapp.com",
	projectId: "fir-notification-8ebbe",
	storageBucket: "fir-notification-8ebbe.firebasestorage.app",
	messagingSenderId: "707302904404",
	appId: "1:707302904404:web:86a007c5ad3bc6851153c1",
	measurementId: "G-WR1R3GNZBW",
	// ADD: replace this placeholder with the Firebase Web Push public key (VAPID) from Console → Cloud Messaging
	vapidKey: "BLGKo1sVcucQnegS6BgZVY58nRY5ZPMJTWFfl8h29M-uvc-NMP-QvfWnNJ2zf1sBTJcuUrHXvcJMh_FYiQYOGQw"
};

// ADD: helper to convert base64-url VAPID key to Uint8Array for PushManager.subscribe if you subscribe manually
export function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = typeof atob === 'function' ? atob(base64) : Buffer.from(base64, 'base64').toString('binary');
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export function getApplicationServerKey() {
	return urlBase64ToUint8Array(firebaseConfig.vapidKey);
}
