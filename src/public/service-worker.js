const CACHE_NAME = "berbagi-cerita-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/app.bundle.js", // sesuaikan dengan nama bundle Webpack kamu
  // Tambahkan file statis lain yang jadi bagian Application Shell
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("push", (event) => {
  let data = {
    title: "Notifikasi Baru",
    body: "Ini isi notifikasinya.",
    url: "/",
  };
  if (event.data) {
    data = event.data.json();
  }
  const options = {
    body: data.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: { url: data.url },
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Jika ada tab dengan URL notifikasi, fokus tab itu
      for (const client of windowClients) {
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus();
        }
      }
      // Kalau tidak ada, buka tab baru
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
