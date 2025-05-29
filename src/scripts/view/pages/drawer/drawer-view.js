// view/pages/drawer/drawer-view.js

const drawer = document.createElement("nav");
drawer.classList.add("navigation-drawer");

drawer.innerHTML = `
  <ul class="nav-list">
    <li><a href="#/home">Beranda</a></li>
    <li><a href="#/bagikan">Bagikan Cerita</a></li>
    <li><a href="#/about">About</a></li>
    <li><a href="#" id="logoutBtn">Logout</a></li>
  </ul>
`;

const logoutBtn = drawer.querySelector("#logoutBtn");

// Event handler browser-level (BOM)
logoutBtn.addEventListener("click", () => {
  window.dispatchEvent(new Event("userloggedout"));
  window.location.hash = "/";
});

const drawerView = {
  element: drawer,

  /**
   * Pasang callback logout dari presenter
   */
  bindLogout(callback) {
    logoutBtn.addEventListener("click", () => {
      if (typeof callback === "function") {
        callback();
      }
    });
  },

  /**
   * Tampilkan atau sembunyikan drawer
   */
  setVisible(isVisible) {
    drawer.style.display = isVisible ? "block" : "none";
  },
};

export default drawerView;
