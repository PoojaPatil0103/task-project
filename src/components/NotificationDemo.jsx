import React, { useState, useEffect } from 'react';
import { getToken, onMessage, messaging } from '../firebase';
// ADD: import config so we pass the correct VAPID key (replace placeholder in firebaseConfig.js)
import { firebaseConfig } from '../firebaseConfig';
// ADD: restore icons used in JSX
import { Bell, AlertTriangle, CheckCircle, Copy } from 'lucide-react';

const NotificationDemo = () => {
	const [token, setToken] = useState('');
	const [notification, setNotification] = useState(null);
	const [error, setError] = useState(null);
	const [permission, setPermission] = useState(Notification.permission);

	const requestPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			setPermission(permission);
			if (permission === 'granted') {
				// Use the VAPID public key from firebaseConfig. If you use getToken, pass the string:
				const currentToken = await getToken(messaging, {
					vapidKey: firebaseConfig.vapidKey // <-- make sure this is your Web Push public key
				});

				if (currentToken) {
					setToken(currentToken);
					setError(null);
				} else {
					setError('No registration token available. Request permission to generate one.');
				}
			} else {
				setError('Notification permission denied.');
			}
		} catch (err) {
			console.error('An error occurred while retrieving token. ', err);
			setError(err.message);
		}
	};

	useEffect(() => {
		if (Notification.permission === 'granted') {
			requestPermission();
		}

		const unsubscribe = onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			setNotification({
				title: payload?.notification?.title ?? 'Notification',
				body: payload?.notification?.body ?? '',
			});

			// Clear notification after 5 seconds
			setTimeout(() => setNotification(null), 5000);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(token);
		alert('Token copied to clipboard!');
	};

	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-100">
			<div className="flex items-center space-x-2">
				<Bell className="h-6 w-6 text-blue-500" />
				<h2 className="text-xl font-bold text-gray-800">Firebase Notifications</h2>
			</div>

			<div className="space-y-2">
				<div className="flex justify-between items-center">
					<span className="text-sm font-medium text-gray-500">Status:</span>
					<span className={`px-2 py-1 rounded-full text-xs font-semibold ${permission === 'granted' ? 'bg-green-100 text-green-800' :
						permission === 'denied' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
						}`}>
						{permission.toUpperCase()}
					</span>
				</div>
			</div>

			{permission !== 'granted' && (
				<button
					onClick={requestPermission}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
				>
					Enable Notifications
				</button>
			)}

			{token && (
				<div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
					<div className="flex justify-between items-center mb-1">
						<span className="text-xs font-bold text-gray-500 uppercase">FCM Token</span>
						<button onClick={copyToClipboard} className="text-gray-400 hover:text-blue-500">
							<Copy size={14} />
						</button>
					</div>
					<p className="text-xs text-gray-600 break-all font-mono">{token}</p>
				</div>
			)}

			{error && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
					<div className="flex">
						<div className="flex-shrink-0">
							<AlertTriangle className="h-5 w-5 text-red-500" />
						</div>
						<div className="ml-3">
							<p className="text-sm text-red-700">{error}</p>
						</div>
					</div>
				</div>
			)}

			{notification && (
				<div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded animate-fade-in-down">
					<div className="flex">
						<div className="flex-shrink-0">
							<CheckCircle className="h-5 w-5 text-blue-500" />
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-blue-800">{notification.title}</h3>
							<div className="mt-2 text-sm text-blue-700">
								<p>{notification.body}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="text-xs text-center text-gray-400 mt-4 space-y-2">
				<p>Send a test message from Firebase Console to see it appear here.</p>
				<button
					onClick={() => { throw new Error("Test Crash from NotificationDemo"); }}
					className="text-red-400 hover:text-red-600 underline"
				>
					Test Crash (Check Console/Crashlytics)
				</button>
			</div>
		</div>
	);
};

export default NotificationDemo;
