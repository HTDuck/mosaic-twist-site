const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-site-nav]");

if (navToggle && nav) {
  const navHeader = nav.closest(".site-header");
  const navBreakpoint = window.matchMedia("(max-width: 56rem)");

  const navigationIsOpen = () => navToggle.getAttribute("aria-expanded") === "true";

  const setNavigationOpen = (isOpen, { restoreFocus = false } = {}) => {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    nav.dataset.open = String(isOpen);
    document.body.classList.toggle("nav-open", isOpen);

    if (!isOpen && restoreFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener("click", () => {
    setNavigationOpen(!navigationIsOpen());
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigationIsOpen()) {
      setNavigationOpen(false, { restoreFocus: true });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      navigationIsOpen()
      && navHeader
      && event.target instanceof Node
      && !navHeader.contains(event.target)
    ) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("focusin", (event) => {
    if (
      navigationIsOpen()
      && navHeader
      && event.target instanceof Node
      && !navHeader.contains(event.target)
    ) {
      setNavigationOpen(false);
    }
  });

  navBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
      setNavigationOpen(false);
    }
  });

  setNavigationOpen(false);
}

const year = document.querySelector("[data-current-year]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
