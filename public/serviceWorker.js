console.log("Service Worker Loaded...");

const pushNotification = (event) => {
    const data = event.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "Welcome back, hero",
    }).then(() => console.log("Notification has been shown"));
}

const handleClickNotification = (event) => {
    if (event.action === 'close') {
        event.notification.close();
        return;
    }

    if (event.action === 'open' || event.action === '') {
        event.notification.close();

        event.waitUntil(
            self.clients
                .matchAll({ type: 'window', includeUncontrolled: true })
                .then((windowClients) => {
                    if (windowClients.length > 0) {
                        windowClients[0].focus().then((client) =>
                            client.postMessage({
                                msg: event.notification.data || 'some data',
                            })
                        );
                    } else {
                        return self.clients.openWindow('/').then((client) =>
                            client.postMessage({
                                msg: event.notification.data || 'some data',
                            })
                        );
                    }
                })
        );
    }
}

self.addEventListener("push", pushNotification);
self.addEventListener("notificationclick", handleClickNotification);