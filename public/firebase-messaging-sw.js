importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");

const firebaseConfig = {
	apiKey: "AIzaSyDjGuH0ukKK39eWhCW81CvhDzUJ8f9fLN4",
	authDomain: "fir-notification-8ebbe.firebaseapp.com",
	projectId: "fir-notification-8ebbe",
	storageBucket: "fir-notification-8ebbe.firebasestorage.app",
	messagingSenderId: "707302904404",
	appId: "1:707302904404:web:86a007c5ad3bc6851153c1"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Robust background message handler with defensive checks and error logging
messaging.onBackgroundMessage((payload) => {
	try {
		console.log("[firebase-messaging-sw.js] Received background message ", payload);

		// Prefer notification payload if present; otherwise try payload.data fields
		const notif = payload?.notification || {};
		let title = notif?.title || payload?.data?.title || "Notification";
		let body = notif?.body || payload?.data?.body || (payload?.data && JSON.stringify(payload.data)) || "";
		const icon = notif?.icon || payload?.data?.icon || "/logo192.png";

		// Build options safely
		const options = {
			body,
			icon,
			// allow additional data to be passed to notificationclick handler
			data: payload?.data || {}
		};

		// Show notification and catch any errors (e.g., invalid parameters)
		self.registration.showNotification(title, options).catch((err) => {
			console.error("[firebase-messaging-sw.js] showNotification error:", err);
		});
	} catch (err) {
		// Ensure errors don't kill the service worker
		console.error("[firebase-messaging-sw.js] onBackgroundMessage handler error:", err);
	}
});

// Fallback: handle raw push events (in case message comes without firebase-messaging wrapper)
self.addEventListener("push", (event) => {
	try {
		if (!event.data) {
			console.log("[firebase-messaging-sw.js] Push event without data");
			return;
		}
		const payload = event.data.json ? event.data.json() : { data: event.data.text() };
		const title = payload?.notification?.title || payload?.data?.title || "Notification";
		const body = payload?.notification?.body || payload?.data?.body || "";
		const icon = payload?.notification?.icon || "/logo192.png";

		const options = { body, icon, data: payload?.data || {} };
		event.waitUntil(self.registration.showNotification(title, options));
	} catch (err) {
		console.error("[firebase-messaging-sw.js] push event handling error:", err);
	}
});

// Optional: handle notification click to focus/open client
self.addEventListener("notificationclick", function (event) {
	event.notification.close();
	const url = event.notification?.data?.url || "/";
	event.waitUntil(
		clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
			for (const client of clientList) {
				if (client.url === url && 'focus' in client) {
					return client.focus();
				}
			}
			if (clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});
