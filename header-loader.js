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

      function openMenu() {
        nav.classList.add("active");
        overlay.classList.add("active");
        // تجميد الصفحة بالكامل — body + html
        document.body.style.overflow    = "hidden";
        document.body.style.position    = "fixed";
        document.body.style.width       = "100%";
        document.documentElement.style.overflow = "hidden";
      }

      function closeMenu() {
        nav.classList.remove("active");
        overlay.classList.remove("active");
        // تحرير الصفحة
        document.body.style.overflow    = "";
        document.body.style.position    = "";
        document.body.style.width       = "";
        document.documentElement.style.overflow = "";
      }

      toggle.addEventListener("click", () => {
        nav.classList.contains("active") ? closeMenu() : openMenu();
      });

      // إغلاق عند الضغط على الـ overlay
      overlay.addEventListener("click", closeMenu);

      // إغلاق عند الضغط على أي رابط داخل القائمة
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
      });

      // إغلاق عند الضغط على Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });

      // إغلاق تلقائي إذا اتسعت الشاشة (تدوير الجهاز)
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
