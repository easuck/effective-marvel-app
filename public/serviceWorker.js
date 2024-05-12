console.log("Service Worker Loaded..."); //не вызывается???

self.addEventListener("push", (e) => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "Knock Knock",
    }).then(() => console.log("Notification has been shown"));
});