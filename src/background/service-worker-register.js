const registerServiceWorker = () => {
  return new Promise((resolve, reject) => {
    if (!("serviceWorker" in navigator)) {
      reject(new Error("Service Worker not supported"));
      return;
    }

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
          resolve(registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
          reject(error);
        });
    });
  });
};

export default registerServiceWorker;
