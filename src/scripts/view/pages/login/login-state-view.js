const createLoginStateView = () => {
  const container = document.createElement("div");

  return {
    element: container,

    /**
     * Pasang drawer ke container header di DOM
     */
    attachDrawer(drawer) {
      const headerContainer = document.querySelector(".main-header.container");
      if (headerContainer) {
        headerContainer.appendChild(drawer);
      }
    },

    /**
     * Atur tampil/tidaknya drawer
     */
    setDrawerVisibility(isVisible) {
      // pindahkan pengaturan style ke sini
      this.element.style.display = isVisible ? "block" : "none";
    },
  };
};

export default createLoginStateView;
