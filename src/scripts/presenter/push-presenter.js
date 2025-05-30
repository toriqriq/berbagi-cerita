// push-presenter.js
const publicVapidKey =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"; // Ganti sesuai yang didapat

function urlBase64ToUint8Array(base64String) {
  // Fungsi helper untuk decode VAPID key
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeUserToPush() {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker belum didukung");
    return;
  }
  if (!("PushManager" in window)) {
    console.error("Push Notification belum didukung");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push subscription:", JSON.stringify(subscription));
    // TODO: Kirim subscription ke server API untuk simpan
  } catch (error) {
    console.error("Gagal subscribe push:", error);
  }
}
