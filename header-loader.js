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

      // Mobile menu
      const toggle  = document.getElementById("menuToggle");
      const nav     = document.getElementById("main-nav");
      const overlay = document.getElementById("menuOverlay");

      toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
      });

      overlay.addEventListener("click", () => {
        nav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
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

  // إزالة active السابق
  document.querySelectorAll(".main-nav .active").forEach(el => el.classList.remove("active"));

  // رابط مباشر
  const currentLink = document.querySelector(`.main-nav a[href="${currentPage}"]`);
  if (currentLink) {
    currentLink.classList.add("active");
    return;
  }

  // صفحات المصالح → تفعيل زر الـ dropdown
  if (departmentPages.includes(currentPage)) {
    document.querySelector(".dropbtn")?.classList.add("active");
    return;
  }

  // صفحة تتبع الطلبات
  if (currentPage === "track.html") {
    document.querySelector('.main-nav a[href="track.html"]')?.classList.add("active");
  }
}
