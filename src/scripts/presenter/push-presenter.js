const publicVapidKey =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function getAccessToken() {
  return localStorage.getItem("token"); // atau "token", sesuaikan nama key-mu
}

export async function subscribeUserToPush(registration) {
  if (!("serviceWorker" in navigator)) return;
  if (!("PushManager" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("User menolak notifikasi.");
    return;
  }

  try {
    // 1. Subscribing
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log(
      "Push subscription berhasil:",
      JSON.stringify(subscription.toJSON())
    );

    // 2. Mengambil endpoint & keys
    const { endpoint, keys } = subscription.toJSON();
    const accessToken = getAccessToken(); // Pastikan fungsi ini mengembalikan token
    console.log("Token yang dikirim:", accessToken);

    // 3. Kirim subscription ke server
    const response = await fetch(
      "https://story-api.dicoding.dev/v1/notifications/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ endpoint, keys }),
      }
    );

    const json = await response.json();
    console.log("Subscription berhasil dikirim ke server:", json);
  } catch (error) {
    console.error("Gagal subscribe atau kirim ke server:", error);
  }
}

export async function unsubscribeUser(registration) {
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
    console.log("Push subscription dihentikan.");
  } else {
    console.log("Tidak ada subscription yang aktif.");
  }
}
