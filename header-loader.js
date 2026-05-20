document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) return;

  fetch("header.html")
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load header.html");
      return response.text();
    })
    .then((html) => {
      headerPlaceholder.innerHTML = html;

      const toggle  = document.getElementById("menuToggle");
      const nav     = document.getElementById("main-nav");
      const overlay = document.getElementById("menuOverlay");

      let savedScrollY = 0;

      function openMenu() {
        savedScrollY = window.scrollY;
        nav.classList.add("active");
        overlay.classList.add("active");
        // تجميد بدون إزاحة: نثبّت body في موضعه الحالي
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top      = `-${savedScrollY}px`;
        document.body.style.left     = "0";
        document.body.style.right    = "0";
      }

      function closeMenu() {
        nav.classList.remove("active");
        overlay.classList.remove("active");
        // تحرير الصفحة واسترجاع موضع التمرير بدون قفز
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top      = "";
        document.body.style.left     = "";
        document.body.style.right    = "";
        window.scrollTo(0, savedScrollY);
      }

    if (toggle && nav && overlay) {

  toggle.addEventListener("click", () => {
    nav.classList.contains("active")
      ? closeMenu()
      : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

}
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) closeMenu();
      });

      // التاريخ
      const dateElement = document.getElementById("date");
      if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString("ar-DZ", {
          day: "numeric", month: "long", weekday: "long", year: "numeric"
        });
      }

      setActiveNavLink();
    })
    .catch((error) => console.error(error));
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const departmentPages = [
    "departments.html", "construction.html", "investment.html",
    "property.html", "social.html", "civil.html"
  ];

  document.querySelectorAll(".main-nav .active").forEach(el => el.classList.remove("active"));

  const currentLink = document.querySelector(`.main-nav a[href="${currentPage}"]`);
  if (currentLink) {
    currentLink.classList.add("active");
    return;
  }

  if (departmentPages.includes(currentPage)) {
    document.querySelector(".dropbtn")?.classList.add("active");
    return;
  }

  if (currentPage === "track.html") {
    document.querySelector('.main-nav a[href="track.html"]')?.classList.add("active");
  }

  if (currentPage === "complaints.html") {
    document.querySelector('.main-nav a[href="complaints.html"]')?.classList.add("active");
  }
}
