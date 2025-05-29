class SkipToContentView {
  constructor({
    skipLinkSelector = "#skip-link",
    mainContentSelector = "#main-content",
  }) {
    this.skipLink = document.querySelector(skipLinkSelector);
    this.mainContent = document.querySelector(mainContentSelector);
  }

  bindSkipEvent(handler) {
    if (this.skipLink && this.mainContent) {
      this.skipLink.addEventListener("click", (event) => {
        event.preventDefault();
        handler(); // Presenter yang akan memutuskan apa yang dilakukan
      });
    }
  }

  focusMainContent() {
    this.mainContent.setAttribute("tabindex", "-1");
    this.mainContent.focus();
    this.mainContent.scrollIntoView({ behavior: "smooth" });
  }
}

export default SkipToContentView;
