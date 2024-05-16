const publicVapidKey = "BNmO7o29hUpkX3h_0vE36sVXgtSWMYc6ydzC2oKp1CSV_DQWI8u_cp9tOKpA-36NCQo_lj5E9XNJgobGNcML57I";

export const register = () => {
    if ('serviceWorker' in navigator){
        send().catch(err => console.error(err));
    }
}

async function send(){
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("./serviceWorker.js", {
        scope: "/",
    });
    console.log("Service Worker Registered...");

    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
    });
    console.log("Push Registered...");

    console.log("Sending Push...");
    await fetch("http://localhost:8080/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json",
        },
    });
    console.log("Push Sent...");
}