window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const content = document.querySelector(".fContainer");
  content.style.display = "flex";
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2000);
});