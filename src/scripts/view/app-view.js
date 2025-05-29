// ui-view.js

const appView = {
  removeElement(element) {
    if (element && element.remove) {
      element.remove();
    }
  },

  updateBrandLinkToHome() {
    const brandLink = document.querySelector(".brand-name");
    if (brandLink) {
      brandLink.setAttribute("href", "#/");
    }
  },

  setLocationHash(hash) {
    window.location.hash = hash;
  },

  showNotFound(contentElement) {
    contentElement.innerHTML = "<p>Halaman tidak ditemukan</p>";
  },

  async renderPage(contentElement, page) {
    contentElement.innerHTML = await page.render();
    await page.afterRender();
  },
};

export default appView;
