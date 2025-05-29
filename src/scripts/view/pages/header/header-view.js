const updateHeaderAfterLoginView = () => {
  const brandLink = document.querySelector(".brand-name");
  if (brandLink) {
    brandLink.setAttribute("href", "#/home");
  }
};

export default updateHeaderAfterLoginView;
