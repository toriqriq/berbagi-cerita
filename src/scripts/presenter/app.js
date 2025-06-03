import registerServiceWorker from "../../background/service-worker-register.js";
import { subscribeUserToPush, unsubscribeUser } from "./push-presenter.js";

let swRegistration = null;

// 1. Daftarkan service worker saat halaman dimuat
registerServiceWorker()
  .then((registration) => {
    console.log("SW berhasil didaftarkan");
    swRegistration = registration;
  })
  .catch((error) => {
    console.error("SW gagal didaftarkan:", error);
  });

// 2. Jalankan subscribe saat tombol diklik
document.getElementById("btn-subscribe").addEventListener("click", async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    await subscribeUserToPush(swRegistration); // <- Kirim hasil dari registerServiceWorker
  } else {
    alert("Izin notifikasi ditolak");
  }
});

document
  .getElementById("btn-unsubscribe")
  ?.addEventListener("click", async () => {
    await unsubscribeUser(swRegistration);
  });

import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import handleLoginState from "./session-presenter";
import updateHeaderAfterLogin from "./header-presenter";
import SkipToContentPresenter from "./skip-to-content-presenter";
import SkipToContentView from "../view/skip-to-content-view";
import Auth from "../model/auth";
import appView from "../view/app-view"; //

class App {
  #content = null;
  #navigationDrawer = null;
  #skipToContentPresenter = null;

  constructor({ content }) {
    this.#content = content;

    const skipToContentView = new SkipToContentView({
      skipLinkSelector: "#skip-link",
      mainContentSelector: "#main-content",
    });

    this.#skipToContentPresenter = new SkipToContentPresenter(
      skipToContentView
    );

    // Cek login dan pasang navigasi
    this.#navigationDrawer = handleLoginState(this.#content);

    window.addEventListener("userloggedin", () => {
      this.#navigationDrawer = handleLoginState(this.#content);
      updateHeaderAfterLogin();
      this.renderPage();
    });

    window.addEventListener("userloggedout", () => {
      if (this.#navigationDrawer) {
        appView.removeElement(this.#navigationDrawer); // ganti drawer.remove()
        this.#navigationDrawer = null;
      }
      appView.updateBrandLinkToHome(); // ganti manipulasi .brand-name
      this.renderPage();
    });
  }

  async renderPage() {
    const url = getActiveRoute();

    const isLoggedIn = Auth.isLoggedIn();

    if (
      isLoggedIn &&
      (url === "/" || url === "/login" || url === "/register")
    ) {
      appView.setLocationHash("#/home"); // ganti window.location.hash = ...
      return;
    }

    if (
      !isLoggedIn &&
      ["/home", "/story", "/story/:id", "/bagikan"].includes(url)
    ) {
      appView.setLocationHash("#/login");
      return;
    }

    //ini untuk menu navigasi

    const PageClass = routes[url];

    if (!PageClass) {
      appView.showNotFound(this.#content);
      return;
    }

    const page = new PageClass();
    await appView.renderPage(this.#content, page);
  }
}

export default App;
