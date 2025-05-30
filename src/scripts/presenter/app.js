if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

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
