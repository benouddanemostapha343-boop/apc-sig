document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) {
    return;
  }

  fetch("header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load header.html");
      }

      return response.text();
    })
    .then((html) => {
      headerPlaceholder.innerHTML = html;
      const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("main-nav");
const overlay = document.getElementById("menuOverlay");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  overlay.classList.toggle("active");

  document.body.style.overflow =
    nav.classList.contains("active")
      ? "hidden"
      : "";
});

overlay.addEventListener("click", () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");

  document.body.style.overflow = "";
});
      const dateElement = document.getElementById("date");

      if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString("ar-DZ", {
          day: "numeric",
          month: "long",
          weekday: "long",
          year: "numeric"
        });
      }

     

      setActiveNavLink();
    })
    .catch((error) => {
      console.error(error);
    });
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const departmentPages = [
    "departments.html",
    "construction.html",
    "investment.html",
    "property.html",
    "social.html",
    "civil.html"
  ];

  document.querySelectorAll(".main-nav .active").forEach((item) => {
    item.classList.remove("active");
  });

  const currentLink = document.querySelector(`.main-nav a[href="${currentPage}"]`);

  if (currentLink) {
    currentLink.classList.add("active");
    return;
  }

  if (departmentPages.includes(currentPage)) {
    document.querySelector(".dropbtn")?.classList.add("active");
  }
}
